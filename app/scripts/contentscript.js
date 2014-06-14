'use strict';

var currentURL = '';

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


var init = _.debounce(function() {

    console.log('init');

    currentURL = location.href;

    var type = getType();

    switch (type) {
    case 'npm':
    case 'bower':
        window.dependenciesModule(type);
        break;
    case 'js':
        window.requireModule();
        break;
    }
}, 250);
