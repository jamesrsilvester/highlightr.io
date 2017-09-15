// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

function requestLink(info, tab) {
  console.log("Your Link is...");
  alert("Your link is...");
}

// Create a parent item and two children.
var parent = chrome.contextMenus.create({"title": "highlightr.io"});
var child1 = chrome.contextMenus.create(
  {"title": "Copy Shareable Link", "parentId": parent, "onclick": requestLink});
var child2 = chrome.contextMenus.create(
  {"title": "Test", "parentId": parent, "onclick": genericOnClick});
console.log("parent:" + parent + " child1:" + child1 + " child2:" + child2);
