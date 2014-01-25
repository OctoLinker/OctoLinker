'use strict';

chrome.tabs.onUpdated.addListener(function( tabId, changeInfo, tab ) {
  if( changeInfo.status == 'complete' ) {
    if( tab && tab.url ) {
      var url = tab.url;

      if( url.indexOf('https://github.com') !== 0 ) {
        return;
      }

      var type = null;
      if( url.indexOf('/package.json') !== -1 ) {
        type = 'npm';
      }
      if( url.indexOf('/bower.json') !== -1 ) {
        type = 'bower';
      }

      if( type ) {
        chrome.tabs.executeScript(null, {code: "missingGithubLinks.init('" + type + "');"});
      }
    }
  }
});