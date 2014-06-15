'use strict';

var requireModule = require('./module/require.js');
var dependenciesModule = require('./module/dependencies.js');

module.exports = function () {

    var getType = function() {

        var urlContains = function(indicator) {
            var url = location.href;
            return url.indexOf(indicator) === url.length - indicator.length;
        };

        if( urlContains('/package.json')) {
            return 'npm';
        }

        if( urlContains('/bower.json')) {
            return 'bower';
        }

        if( urlContains('.js')) {
            return 'js';
        }

        return null;
    };

    return _.debounce(function() {
        var type = getType();
        switch (type) {
        case 'npm':
        case 'bower':
            dependenciesModule(type);
            break;
        case 'js':
            requireModule();
            break;
        }
    }, 250);
};

window.init = module.exports();
