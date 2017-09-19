function requestLink() {
  console.log("menu button clicked");
  chrome.tabs.query({currentWindow: true, active: true }, function (tabs) {
    var message = {"message": "provide shareable URL"};
      chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

// Create a parent item and two children.
var parent = chrome.contextMenus.create({"title": "Share Highlights", "onclick": requestLink});

//Placehold for further menu options
// var child1 = chrome.contextMenus.create({"title": "Share My Highlights", "parentId": parent, "onclick": requestLink});
// var child2 = chrome.contextMenus.create(
//   {"title": "Test", "parentId": parent, "onclick": genericOnClick});
