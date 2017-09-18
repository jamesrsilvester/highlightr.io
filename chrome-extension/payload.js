const state = {
  mode: "POST", // after POSTing once, switch to PATCH
  slug: null, // set on first response
  isActive: false, // turn true on message from background.js
  shareable: null
}

function highlight (selection) {  // frontend for first recursive call...
  let flat = []; // flat array of DOM nodes with highlighting coordinates
  flatten(document.querySelector('body'), { // start from root node
    targets: [selection.anchorNode, selection.focusNode], // unordered
    offsets: [selection.anchorOffset, selection.focusOffset], // same indices as `targets`
    flat: flat,
    isActive: false // start highlighting?
  });
  flat.forEach((instruction) => { // colorize flat array
    colorize(instruction.node, instruction.start, instruction.end);
  });
}

function flatten (node, opt) {  // recursive
  if (!opt.targets[0] && !opt.targets[1]) return; // if we reached both targets, return
  let index = opt.targets.indexOf(node);
  if (index > -1) { // if we're at one of our targets...
    if (!opt.isActive) {  // highlighting start...
      opt.isActive = true;  // turn on
      // check for case where anchor & focus are same
      if (opt.targets[0] === opt.targets[1]) {  // if anchor & focus same
        opt.isActive = false;  // done if both were current node
        delete opt.targets[0];
        delete opt.targets[1];
        let firstIndex = (opt.offsets[0] < opt.offsets[1] ? 0 : 1);
        let secondIndex = (firstIndex + 1) % 2; // grabs other index
        opt.flat.push({
          node: node,
          start: opt.offsets[firstIndex],
          end: opt.offsets[secondIndex]
        });
      } else {  // this is just the start point
        opt.flat.push({
          node: node,
          start: opt.offsets[index],
          end: node.data.length
        });
      }
    } else {  // was active & hit target, thus we finish highlighting
      opt.isActive = false; // turn off
      opt.flat.push({
        node: node,
        start: 0,
        end: opt.offsets[index]
      });
    }
    delete opt.targets[index];  // clear current node from targets
  }
  if (node.childNodes.length === 0) { // if we reached end of branch
    if (opt.isActive && index === -1) {
      let end = node.data ? node.data.length : 0; // fix error w/prop of undef
      opt.flat.push({
        node: node,
        start: 0,
        end: end
      });
    }
    return; // end of tree branch, we can return;
  } else {  // child nodes exist
    node.childNodes.forEach(childNode => flatten(childNode, opt));
  }
}

function colorize(node, start, end) {
  // if it is a text node, has a direct parent element, and has non-whitespace content...
  if (node.nodeType === 3 && node.parentElement && node.data.trim().length > 0) {
    // select appropriate range
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);

    const span = document.createElement('span');  // create wrapper span
    const extraction = range.extractContents(); // extract our selected text
    span.appendChild(extraction);  // and insert it into our span
    span.className = 'highlightr-span';  // add our branded class name
    // color it
    span.setAttribute('style', 'background-color: rgba(142, 253, 178, 0.6)!important');
    range.insertNode(span); // insert our highlight back in place
  }
}
  
chrome.runtime.sendMessage({message: "requesting highlightr status"}, function (response){
  if (response.status === true){
    console.log("eventPage says turn highlightr on. Acquiescing...");
    turnOn();
  }
  if (response.status === false){
    console.log("eventPage says highlightr should be off. A Kuna Ma Tata.");
    turnOff();
  }
})

/* TODO: vanillaJS solution
function ajaxPost (data) {
  const request = new XMLHttpRequest();
  request.open('POST', apiUrl, true);
  //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  console.log('about to POST', typeof data.content);
  //data.content = String(data.content);
  console.log(data);
  request.send(data);
}
*/

function selectionHandler (e) {
  const selection = window.getSelection();
  if (selection.toString().length === 0) {
    return; // if user selected nothing, return
  }
  //chrome.runtime.sendMessage('Selection made');
  highlight(selection);
  // now clear selection
  selection.removeAllRanges();
  const data = {
    content: document.all[0].outerHTML,
    _user: null,  // later set this from session
    url: document.location.href
  }
  let endpoint = 'http://localhost:8080/api/articles';
  if (state.mode === 'PATCH') { // PATCH route includes slug identifier
    endpoint = `${endpoint}/${state.slug}`;
  }
  $.ajax({
    method: state.mode, // POST first time, PATCH subsequently
    url: endpoint,
    data: data,
    success: (res) => {
      state.mode = 'PATCH'; // don't POST next time
      state.slug = res.slug;
      state.shareable = res.shareable
      console.log('Your highlightr link is: ' + state.shareable);
    }
  });
  //ajaxPost(data);
}

// inject our styles
$(`<style>
  #highlightr-modal {
    font-family: sans-serif;
    box-sizing: border-box;
    top: 2em;
    left: 50%;
    position: fixed;
    display: none;
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 5px;
    width: 26rem;
    margin-left: -13rem;
    padding: 1rem;
    z-index: 99;
    font-size: 1.375rem;
    word-break: break-all;
    text-align: center;
  }
  #highlightr-modal .close {
    float: right;
    cursor: pointer;
    user-select: none;
  }
  #highlightr-modal a, #highlightr-modal a:visited, #highlightr-modal a:active {
    color: #777;
    text-decoration: none;
  }
  #highlightr-modal a:hover {
    text-decoration: underline;
  }
</style>`).appendTo('body');

$(`<div id="highlightr-modal">
  <div
    class="close"
    onClick="document.getElementById('highlightr-modal').style.display = 'none'">&times;</div>
  <div>
    <div style="margin-bottom: 0.2em"><strong>Your link is:</strong></div>
    <div>
      <a class="highlightr-shareable-anchor" target="_blank" href="">
        null
      </a>
    </div>
  </div>
</div>`).appendTo('body');

function shareLink (url) {
  if (url) {
    const $modal = $('#highlightr-modal');
    const $anchor = $modal.find('a');
    $anchor.text(url);
    $anchor.attr('href', url);
    $modal.css('display', 'inline-block');
  } else {  // no shareable link provided
    alert('Please make some highlights first!')
  }
};

function turnOn () {
  state.isActive = true;
  // for css selectors
  document.querySelector('body').classList.add('highlightr-body');
  document.addEventListener('mouseup', selectionHandler);
  console.log("highlightr turned on");
}

function turnOff () {
  state.isActive = false;
  // for css selectors
  document.querySelector('body').classList.remove('highlightr-body');
  document.removeEventListener('mouseup', selectionHandler);
  console.log("highlightr turned off");
}

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  //confirm message recieved.
  console.log("message recieved: ", msg.message);
  if (msg.message === 'highlightr is on') {
    turnOn();
  }
  if (msg.message === 'highlightr is off') {
    turnOff();
  }
  if (msg.message === 'provide shareable URL') {
    shareLink(state.shareable);
  }
});
