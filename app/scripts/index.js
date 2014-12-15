'use strict';

var gitHubLinkerCore = require('github-linker-core');
var $ = require('jquery');

window.initGitHubLinker = function() {
    var options = {};
    window.$ = $;
    gitHubLinkerCore(window, window.location.href, options, function(err) {
        if (err) {
            console.error(err);
        }
    });
};

window.initGitHubLinker();
