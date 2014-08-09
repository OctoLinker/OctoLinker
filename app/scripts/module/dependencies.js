'use strict';

var path = require('path');
var $ = require('jquery');

var packageType = '';
var GITHUBCOM = 'https://github.com/';

var getPackageNodes = function( selector ) {
    var root = $('.nt:contains(\'' + selector + '\')');

    if( !root || root.length === 0 ) {
        return [];
    }

    var result = [];
    var el;
    var elVersion = null;
    var next = root.closest('tr').next();

    if( next ) {
        while( next.find('.blob-line-code').children().length !== 1 ) {
            el = next.find('.blob-line-code').children().eq(0);
            elVersion = next.children().eq(2);
            var targetURL = null;
            if(elVersion.length) {
                var versionString = elVersion.html().replace(/"/g, '');
                // GitHub URL user/repo
                if(versionString.split('/').length === 2) {
                    versionString = versionString.replace('#', '/tree/');
                    targetURL = 'https://github.com/' + versionString;
                }
            }

            var pkgData = {
                el: el,
                pkgName: el.html().replace(/"/g, ''),
                targetURL: targetURL
            };

            result.push(pkgData);
            next = next.next();
        }
    }
    return result;
};

var createLinkTag = function( list ) {
    var registryList = null;

    if(packageType === 'npm') {
        registryList = require('../cache/npm.js');
    }else if(packageType === 'bower') {
        registryList = require('../cache/bower.js');
    }

    $.each(list, function( index, item ) {
        var link = registryList[item.pkgName];
        var $link = $('<a>');

        if(item.targetURL) {
            link = item.targetURL;
        } else if( !link && packageType === 'npm' ) {
            link = 'https://npmjs.org/package/' + item.pkgName;
        }

        if( link ) {
            $link.attr('href', link)
            .on('click', function() {
                var url =  $(this).attr('href');
                chrome.runtime.sendMessage({action: 'forwarding', value: url});
            });
            item.el.wrap($link);
        } else {
            item.el.addClass('tooltipped tooltipped-e').attr('aria-label', 'Sorry, there is no link for this package available');
        }
    });
};

module.exports = function(type) {
    packageType = type;

    $('.code-body a span').unwrap();

    var types = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
    var list = types.map(function( item ) {
        return getPackageNodes(item);
    });

    $.each(list, function( index, item ) {
        createLinkTag(item);
    });

    if (type === 'npm') {
        var $main = $('span.nt:contains("main")').next().next();
        if($main.length > 0) {
            var val = $main.html().replace(/'|"/g, '');
            var basePath = location.href.replace(GITHUBCOM, '');
            var link = path.resolve(path.dirname(basePath), val);

            if (link) {
                $main.wrap('<a href="' + link + '">');
            }
        }
    }
};
