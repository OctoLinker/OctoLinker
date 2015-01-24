'use strict';

var gitHubLinkerCore = require('github-linker-core');
var $ = require('jquery');
window.$ = $;

chrome.storage.sync.get('showUpdateNotification', function(options) {
    options = options || {};

    options.changelog = 'https://github.com/github-linker/chrome-extension/releases';
    options.version = require('../manifest.json').version.split('.').slice(0,-1).join('.');

    gitHubLinkerCore(window, options, function(err) {
        if (err) {
            console.error(err);
        }
    });
});
