// Highlightr starting state is false.
var isActive = false;

function reloadTabs(query) {
  chrome.tabs.query(query, tabs => {
    tabs.forEach(tab => {
      if (tab.title) {  // prevents extension page reload
        chrome.tabs.reload(tab.id);
      }
    });
  });
}

//reload all tabs on initial extension load.
reloadTabs({});
/*
chrome.tabs.query({}, function(tabs) {
  tabs.forEach(function (tab) {
    //prevents extensions page from reloading
    if (tab.title){
      chrome.tabs.reload(tab.id);
    };
  });
});
*/

//toggle highlightr on/off
chrome.browserAction.onClicked.addListener(function(tab) {
  //check start status
  flipSwitch();
  updateIcon();
  const obj = {
    message: isActive ? 'highlightr is on' : 'highlightr is off'
  }
  messageTabs({}, obj);
});

function flipSwitch() {
  isActive = !isActive;
};

function updateIcon() {
  const currentIcon = isActive ? "icon_on.png" : "icon_off.png";
  chrome.browserAction.setIcon({path: currentIcon})
};

function messageTabs(query, obj) {
  // Finds tab(s)
  chrome.tabs.query(query, function(tabs) {
    tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, obj));
  });
}

//respond to messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.message === 'get status') {
    sendResponse({status: isActive});
  } else if (message.message === 'ajax') {
    // send ajax request
    const obj = message.ajaxObject;
    obj.success = (res) => {  // ajax response from server
      if(sender.tab) {  // if we have a sender
        console.log('ajax successful!');
        console.log(res);
        sendResponse(res);
      } else {
        //huh?!
        console.error('ajax call has no sender?!');
      }
      /*
      // message tabs
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length > 1) {
          console.error('Unexpected behavior, active tabs are more than 1:', tabs);
        } else {
          
        }
      })
      */
    };
    obj.error = (a, b, c) => {
      console.error('AJAX failed!')
      console.log(a);
      console.log(b);
      console.log(c);
    };
    console.log('about to AJAX request');
    console.log(obj);
    $.ajax(obj);
    return true;  // since sendResponse gets called asynchronously
  }
});
