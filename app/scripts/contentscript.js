(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

        console.log('init');

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

},{"./module/dependencies.js":2,"./module/require.js":3}],2:[function(require,module,exports){
'use strict';

module.exports = function(type) {
    console.log('dependenciesModule.init(' + type + ')');
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function() {
    console.log('requireModule.init()');

    var $requires = $('span.nx:contains(require)').next().next();

    $.each($requires, function(index, el) {

        var val = $(el).html().replace(/'|"/g, '');
        var link = '';

        if ( val.indexOf('.') === 0) {

            link = val;

            var suffix = '.js';
            if (val.indexOf(suffix) !== val.length - suffix.length ) {
                link += '.js';
            }
        }

        if (npmRegistry.rows[val]) {
            link = npmRegistry.rows[val];
        }

        if (link) {
            $(el).wrap('<a href="' + link + '">');
        }

    });
};

},{}]},{},[1,2,3])