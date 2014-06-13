'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function (tabId) {
    chrome.pageAction.show(tabId);
});

chrome.tabs.onUpdated.addListener(function( tabId, changeInfo, tab ) {
  if( changeInfo.status === 'complete' ) {
    if( tab && tab.url ) {
        chrome.tabs.executeScript(null, {code: 'init();'});
    }
  }
});
