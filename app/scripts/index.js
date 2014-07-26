'use strict';

var _ = require('underscore');
var requireModule = require('./module/require.js');
var dependenciesModule = require('./module/dependencies.js');

module.exports = function () {

    var getType = function() {

        var urlContains = function(indicator) {
            var url = location.href;
            return url.indexOf(indicator) === url.length - indicator.length;
        };
        var lookup = {
            '/package.json': 'npm',
            '/bower.json': 'bower',
            '.js': 'js'
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
            requireModule();
            break;
        }
    }, 250);
};

window.init = module.exports();
