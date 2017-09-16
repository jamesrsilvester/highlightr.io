
//TODO Request Shareable link URL from payload.js
function requestLink(info, tab) {
  console.log("Your Link is...");
  alert("Your link is...");
}

// Create a parent item and two children.
var parent = chrome.contextMenus.create({"title": "highlightr.io"});
var child1 = chrome.contextMenus.create(
  {"title": "Copy Shareable Link", "parentId": parent, "onclick": requestLink});
// var child2 = chrome.contextMenus.create(
//   {"title": "Test", "parentId": parent, "onclick": genericOnClick});
