// Highlightr starting state is false.
var isActive = false;
//Event listener for default_action, set as extension icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  //check start status
  flipSwitch();
  setIcon();
  messageTabs();
});

function flipSwitch() {
  isActive = !isActive;
  console.log("Highlightr set to", isActive);
};

function setIcon() {
  if (isActive === true) {
    chrome.browserAction.setIcon({path: "icon_on.png"});
  }
  if (isActive === false) {
    chrome.browserAction.setIcon({path: "icon_off.png"});
  };
};

function messageTabs() {
  // Finds ALL tabs:
  chrome.tabs.query({}, function(tabs) {
    //if we're active, tell tabs to turn on
    if (isActive === true) {
      //message confirms ON Status
      var message = {
        "message": "highlightr is on"
      };
      //send messages to each via loop
      for (let i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, message);
      };
    }
    //if we're inactive, tell tabs to turn off
    if (isActive === false) {
      //message confirms OFF Status
      var message = {
        "message": "highlightr is off"
      };
      //send messages to each via loop
      for (let i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, message);
      };
    }
  });
}

//respond to status check from any new or reloaded tab
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  console.log(message);
  sendResponse({status:isActive});
});
