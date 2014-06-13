'use strict';

var requireModule = function(type) {

    var init = function() {
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

    init();
};
