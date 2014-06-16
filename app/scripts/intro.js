'use strict';

module.exports = function() {

	if($('.githublinker-intro').length === 0) {
	    var $intro = $('<div class="githublinker-intro octotip">Hi, your GitHub-Linker Chrome extension has some improvements for you! <a href="https://github.com/stefanbuck/github-linker">Read more about it.</a></div>');
	    $('.pagehead .container').prepend($intro);
	}
};
