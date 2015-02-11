'use strict';

var gitHubLinkerCore = require('github-linker-core');
var $ = require('jquery');
window.$ = $;

chrome.storage.sync.get(['version'], function(store) {
    var pkgVersion, options;

    pkgVersion = require('../manifest.json').version.split('.').slice(0,-1).join('.');
    options = {
        changelog: 'https://github.com/github-linker/chrome-extension/releases'
    };

    if (store.version && store.version !== pkgVersion) {
        options.showUpdateNotification = true;
    }

    store.version = pkgVersion;
    chrome.storage.sync.set(store);

    gitHubLinkerCore(window, options, function(err) {
        if (err) {
            console.error(err);
        }
    });
});
