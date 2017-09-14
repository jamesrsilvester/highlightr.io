const apiUrl = 'http://localhost:8080/api/articles/'

let articleWasCreated = false;

function highlight (selection) {
  const anchor = selection.anchorNode;
  const focus = selection.focusNode;
  const rangeCount = selection.rangeCount;
  if (rangeCount > 1) throw new Error('More than 1 range! more code necessary!');
  const range = selection.getRangeAt(0);  // is a forEach necessary?
  const slctn = range.extractContents();
  const span = document.createElement('span');
  span.appendChild(slctn);
  span.setAttribute('style', 'background-color: rgba(142, 253, 178, 0.6)!important');
  span.className = 'hovr';
  range.insertNode(span);
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

document.addEventListener('mouseup', function (e) {
  const selection = window.getSelection();
  if (selection.toString().length === 0) return;
  //chrome.runtime.sendMessage('Selection made');

  highlight(selection);
  // now clear selection
  selection.removeAllRanges();
  //chrome.runtime.sendMessage();
  const data = {
    content: document.all[0].outerHTML,
    _user: null,  // later set this from session
    url: document.location.href
  }
  console.log($);
  let method; // either PATCH or POST, for AJAX
  if (articleWasCreated) {
    method = "PATCH";
    // TODO: change URL
  } else {
    method = "POST";
    // TODO: set articleWasCreated to true
  }
  $.ajax({
    method: method,
    url: 'http://localhost:8080/api/articles',
    data: data,
    success: (res) => {
      alert('Your highlightr link is: ' + res.shareable);
    }
  });

  //ajaxPost(data);
});
// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // If the received message has the expected format...
  if (msg.text === 'report_back') {
    // Call the specified callback, passing
    // the web-page's DOM content as argument
    sendResponse(document.all[0].outerHTML);
  }
});
