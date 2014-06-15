'use strict';

var path = require('path');
var util = require('util');

var coreModules = ['fs', 'url', 'util'];
var GITHUBCOM = 'https://github.com/';
var NODEAPICOM = 'http://nodejs.org/api/%s.html';

/**
 * Returns the base url from the given repo url
 *
 * Input: https://github.com/stefanbuck/playground-repo/blob/master/index.js
 * Output: https://github.com/stefanbuck/playground-repo
 */
// var getRepoBaseUrl = function(url) {
//     url = url || location.href;
//     return GITHUBCOM + url.replace(GITHUBCOM, '').split('/').slice(0,2).join('/');
// };

var getRequireLink = function(requireValue) {

    var link = '';
    var basePath = location.href.replace(GITHUBCOM, '');

    if (coreModules.indexOf(requireValue) !== -1 ) {

        link = util.format(NODEAPICOM, requireValue);

    } else if (npmRegistry.rows[requireValue]) {

        link = npmRegistry.rows[requireValue];

    } else {

        link = path.resolve(path.dirname(basePath), requireValue);
        if (!path.extname(link) ) {
            link += '/index.js';
        }
    }

    return link;
};

module.exports = function() {

    var $requires = $('span.nx:contains(require)').next().next();

    $.each($requires, function(index, el) {

        var val = $(el).html().replace(/'|"/g, '');
        var link = getRequireLink( val );

        if (link) {
            $(el).wrap('<a href="' + link + '">');
        }
    });
};
