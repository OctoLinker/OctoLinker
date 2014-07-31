'use strict';

var _ = require('underscore');
var requireModule = require('./module/require.js');
var intro = require('./intro.js');
var dependenciesModule = require('./module/dependencies.js');

module.exports = function () {

    var version = '2.2.x';
    var installedVersion = localStorage.getItem('github-linker-version');
    if (installedVersion !== version) {
        intro();
        localStorage.setItem('github-linker-version', version);
    }

    var getType = function() {

        var urlContains = function(indicator) {
            var url = location.href;
            return url.indexOf(indicator) === url.length - indicator.length;
        };
        var lookup = {
            '/package.json': 'npm',
            '/bower.json': 'bower',
            '.js': 'js',
            '.coffee': 'coffee'
        };

        return _.find(lookup, function(type, urlFragment) {
            return urlContains(urlFragment);
        });
    };

    return _.debounce(function() {
        var type = getType();
        switch (type) {
        case 'npm':
        case 'bower':
            dependenciesModule(type);
            break;
        case 'js':
        case 'coffee':
            requireModule(type);
            break;
        }
    }, 250);
};

window.init = module.exports();
