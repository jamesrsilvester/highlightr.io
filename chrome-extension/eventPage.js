// Highlightr starting state is false.
var isActive=false;
//Event listener for default_action, set as extension icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  //check start status
  console.log("default action clicked. isActive=", isActive);
  // Finds ALL tabs:
  chrome.tabs.query({}, function(tabs){
    // TODO: THIS CAN BE DRYER
    //if off, turn on.
    if (isActive===false){
      //message confirms ON Status
      var message = {"message": "highlightr_isActive_true"};
      //change icon to ON.
      chrome.browserAction.setIcon({path: "icon_on.png"});
      //send messages to each via loop
      for (var i=0; i<tabs.length; i++){
        chrome.tabs.sendMessage(tabs[i].id, message);
      };
    }
    //if on, turn off.
    if (isActive===true){
      //message confirms OFF Status
      var message = {"message": "highlightr_isActive_false"};
      //change icon to OFF.
      chrome.browserAction.setIcon({path: "icon_off.png"});
      //send messages to each via loop
      for (var i=0; i<tabs.length; i++){
        chrome.tabs.sendMessage(tabs[i].id, message);
      };
    }
    console.log("Highlightr was", isActive);
    isActive=!isActive;
    console.log("Highlightr is now", isActive);
  });
});
