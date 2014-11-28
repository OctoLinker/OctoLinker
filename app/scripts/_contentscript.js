'use strict';

var gitHubLinkerCore = require('github-linker-core');
var $ = require('jquery');

var options = {};
window.$ = $;
gitHubLinkerCore(window, options, function(err) {
    if (err) {
        console.error(err);
    }
});
