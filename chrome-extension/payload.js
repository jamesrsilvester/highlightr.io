const state = {
  mode: "POST", // after POSTing once, switch to PATCH
  slug: null, // set on first response
  isActive: false // turn true on message from background.js
}

function highlight (selection) {  // frontend for first recursive call...
  traverseDom(document.querySelector('body'), { // start from root node
    targets: [selection.anchorNode, selection.focusNode], // unordered
    offsets: [selection.anchorOffset, selection.focusOffset], // same indices as `targets`
    isActive: false // start highlighting?
  })
}

function traverseDom (node, opt) {  // recursive
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
        colorize(node, opt.offsets[firstIndex], opt.offsets[secondIndex]);
      } else {  // this is just the start point
        colorize(node, opt.offsets[index], node.data.length - 1); // fr offset to end
      }
    } else {  // was active & hit target, thus we finish highlighting
      opt.isActive = false; // turn off
      colorize(node, 0, opt.offsets[index]);  // colorize from start to offset
    }
    delete opt.targets[index];  // clear current node from targets
  }
  if (node.childNodes.length === 0) { // if we reached end of branch
    if (opt.isActive && index === -1) colorize(node, 0, node.data.length - 1); // don't colorize anchor/focus
    return; // end of tree branch, we can return;
  } else {  // child nodes exist
    node.childNodes.forEach(childNode => traverseDom(childNode, opt));
  }
}

function colorize(node, start, end) {
  console.log('hit colorize');
  console.log(node.data, start, end);
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
  } else {
    console.log('node skipped', node);
  }
}

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
  console.log('made selection', selection);
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
      state.slug = res.slug;  // store slug locally for PATCH route
      // TODO: make present this in a more user-friendly manner
      alert('Your highlightr link is: ' + res.shareable);
    }
  });
  //ajaxPost(data);
}

function turnOn () {
  state.isActive = true;
  // for css selectors
  document.querySelector('body').classList.add('highlightr-body');
  document.addEventListener('mouseup', selectionHandler);
}

function turnOff () {
  state.isActive = false;
  // for css selectors
  document.querySelector('body').classList.remove('highlightr-body');
  document.removeEventListener('mouseup', selectionHandler);
}

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // If the received message has the expected format...
  if (msg.message === 'clicked_browser_action') {
    state.isActive ? turnOff() : turnOn();
    // Call the specified callback, passing
    // the web-page's DOM content as argument
    //sendResponse(document.all[0].outerHTML);
  }
});
