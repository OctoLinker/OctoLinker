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

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-40473036-9']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    _gaq.push(['_trackEvent', request.action, request.value]);
});
