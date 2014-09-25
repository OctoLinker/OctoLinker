'use strict';

var gitHubLinkerCore = require('github-linker-core');
var $ = require('jquery');

window.initGitHubLinker = function() {
    gitHubLinkerCore(window, $, window.location.href, function(err) {
        if (err) {
            console.error(err);
        }
    });
};

window.initGitHubLinker();
