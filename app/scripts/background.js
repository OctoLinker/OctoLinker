'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

/**
 * Get location from an url
 * @param  {String} url Url to parse
 * @return {Object}      location object
 * @return {Object.hostname}      location host
 * @return {Object.pathname}      location path
 */
var getLocation = function(url) {
    var anchor = document.createElement('a');
    anchor.href = url;
    return anchor;
};

chrome.tabs.onUpdated.addListener(function( tabId, changeInfo, tab ) {

    if( changeInfo.status === 'complete' ) {
        if( tab && tab.url ) {
            // Check if we are at github
            var location = getLocation(tab.url);
            if (location && location.hostname && location.hostname.indexOf('github') !== -1) {
                chrome.tabs.executeScript(null, {code: 'if (window.initGitHubLinker && typeof window.initGitHubLinker === \'function\') { window.initGitHubLinker() }'});
            }
        }
    }
});
