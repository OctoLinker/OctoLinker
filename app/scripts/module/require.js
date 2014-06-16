'use strict';

var path = require('path');
var util = require('util');

// List of nodejs core modules (v0.11.13)
// see: https://github.com/joyent/node/blob/master/lib/repl.js#L72
var coreModules = ['assert', 'buffer', 'child_process', 'cluster',
  'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'net',
  'os', 'path', 'punycode', 'querystring', 'readline', 'stream',
  'string_decoder', 'tls', 'tty', 'url', 'util', 'vm', 'zlib', 'smalloc',
  'tracing'];
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
    var npmRegistry = require('../cache/npm.js');

    if (coreModules.indexOf(requireValue) !== -1 ) {

        link = util.format(NODEAPICOM, requireValue);

    } else if (npmRegistry[requireValue]) {

        link = npmRegistry[requireValue];

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
