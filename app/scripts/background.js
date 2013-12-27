'use strict';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      chrome.tabs.executeScript(null, {code:"missingGithubLinks.init();"});
    }
})