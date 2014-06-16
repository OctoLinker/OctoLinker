'use strict';

module.exports = function( grunt ) {

    var _ = require('lodash');
    var utils = require('./lib/utils').init(grunt);
    var template = grunt.file.read('./tasks/cache.tpl');

    /**
    * Custom task to generate the bower registry cache
    */
    grunt.registerTask('bowerCache', function() {
        var done = this.async();

        var dataPath = 'app/scripts/cache/bower.js';
        var url = 'https://bower-component-list.herokuapp.com';
        var result = {};
        var newItemsCount = 0;

        if( grunt.file.exists(dataPath) ) {
            result = require('../' + dataPath);
        }

        utils.getResource({uri: url}, function( err, response, body  ) {

            var item = null;
            var pkg = null;

            for( var i = 0; i < body.length; i++ ) {
                item = body[i];
                pkg = item.name;

                if( !result[pkg] ) {
                    grunt.log.debug('Add: ' + pkg);
                    result[pkg] = item.website;
                    newItemsCount++;
                }
            }

            var total = Object.keys(result).length;
            var jsContent = _.template(template, {
                total: total,
                result: JSON.stringify(result, null, ' '),
                date: grunt.template.today('yyyy-mm-dd')
            });

            grunt.file.write(dataPath, jsContent);

            grunt.log.writeln('newItemsCount: ' + newItemsCount);
            grunt.log.writeln('totalCount: ' + total);
            grunt.config.set('newBowerItems', newItemsCount);
            grunt.config.set('totalBowerItems', total);

            done();
        });
    });
};
