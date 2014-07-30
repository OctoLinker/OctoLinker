'use strict';

var util = require('util');
var path = require('path');
var $ = require('jquery');

// List of nodejs core modules (v0.11.13)
// see: https://github.com/joyent/node/blob/master/lib/repl.js#L72
var coreModules = ['assert', 'buffer', 'child_process', 'cluster',
'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'net',
'os', 'path', 'punycode', 'querystring', 'readline', 'stream',
'string_decoder', 'tls', 'tty', 'url', 'util', 'vm', 'zlib', 'smalloc',
'tracing'];
var GITHUBCOM = 'https://github.com';
var NODEAPICOM = 'http://nodejs.org/api/%s.html';

var getRequireLink = function(requireValue) {

    var link = '';
    var npmRegistry = require('../cache/npm.js');

    if (coreModules.indexOf(requireValue) !== -1 ) {

        link = util.format(NODEAPICOM, requireValue);

    } else if (npmRegistry[requireValue]) {

        link = npmRegistry[requireValue];

    } else {
        var basePath = location.href.replace(GITHUBCOM, '');
        var requirePath = path.resolve(path.dirname(basePath), requireValue);
        if (path.extname(requirePath)) {
            link = requirePath;
        } else {
            link = 'resolve:' + requirePath;
        }
    }

    return link;
};

module.exports = function() {

    // Search for require dom elements
    var $requires = $('span.nx').filter(function() {
        return $(this).text() === 'require';
    }).next().next();

    var attemptToLoadURL = function(urls, cb) {
        var url = urls.shift();
        $.ajax({
            url: url,
            type: 'HEAD'
        }).then(function() {
            cb(url);
        }).fail(function() {
            if (urls.length > 0) {
                attemptToLoadURL(urls, cb);
            } else {
                cb(null);
            }
        });
    };

    $( 'body' ).on( 'click', 'a.github-linker', function(e) {
        var $el = $(this);
        var link = $el.data('href');
        if (link) {
            e.stopPropagation();
            if (link.charAt(link.length-1) === '/') {
                link = link.slice(0, -1);
            }
            var urls = [
                GITHUBCOM + link+'.js',
                GITHUBCOM + link+'/index.js',
                GITHUBCOM + link.replace('blob', 'tree')
            ];
            var $loaderContainer = $('.page-context-loader');
            $loaderContainer.addClass('is-context-loading');
            $el.addClass('tooltipped tooltipped-e').attr('aria-label', 'Loading ...');
            attemptToLoadURL(urls, function(link) {
                $loaderContainer.removeClass('is-context-loading');
                if (link) {
                    location.href = link;
                } else {
                    $el.attr('aria-label', 'Can\'t resolve this require for you, sorry.');
                }
            });
        }
    });

    $.each($requires, function(index, el) {
        var val = $(el).html().replace(/'|"/g, '');
        var link = getRequireLink(val);
        if ( link.indexOf('resolve:') === 0) {
            link = link.replace('resolve:', '');
            $(el).wrap('<a class="github-linker" data-href="' + link + '">');
        } else {
            $(el).wrap('<a class="github-linker" href="' + link + '">');
        }
    });
};
