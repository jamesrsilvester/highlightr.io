// Called when the user clicks on the browser action.
var count=0;
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
  count ++;
  console.log("browser action clicked", count, "times");
  if(count%2===1){
    chrome.browserAction.setIcon({path: "icon_on.png"});
  }
  else {
    chrome.browserAction.setIcon({path: "icon_off.png"});
  }
});
