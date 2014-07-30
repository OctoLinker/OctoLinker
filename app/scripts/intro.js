'use strict';

var $ = require('jquery');

module.exports = function() {

    if($('.githublinker-intro').length === 0) {
        var $intro = $('<div class="githubl-inker-intro flash flash-notice"><span class="octicon octicon-x close js-flash-close"></span>Hi, your GitHub-Linker Chrome extension has some improvements for you! <a href="https://github.com/stefanbuck/github-linker#github-linker">Read more</a></div>');
        $('.pagehead .container').prepend($intro);
    }
};
