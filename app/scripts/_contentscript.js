'use strict';

var octoLinkerCore = require('octo-linker-core');
var $ = require('jquery');
window.$ = $;

chrome.storage.sync.get(['version', 'enableUpdateNotification'], function(store) {
    var pkgVersion, options;

    if (store.enableUpdateNotification === undefined) {
        store.enableUpdateNotification = true;
    }

    pkgVersion = require('../manifest.json').version.split('.').slice(0,-1).join('.');
    options = {
        changelog: 'https://github.com/octo-linker/chrome-extension/releases'
    };

    if (store.enableUpdateNotification && store.version && store.version !== pkgVersion) {
        options.showUpdateNotification = true;
    }

    store.version = pkgVersion;
    chrome.storage.sync.set(store);

    octoLinkerCore(window, options, function(err) {
        if (err) {
            console.error(err);
        }
    });
});
