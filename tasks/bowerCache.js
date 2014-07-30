'use strict';

var bowerList = require('bower-list');
var _ = require('lodash');
var path = require('path');

module.exports = function( grunt ) {

    var template = grunt.file.read('./tasks/cache.tpl');

    /**
    * Custom task to generate the bower registry cache
    */
    grunt.registerTask('bowerCache', function() {
        var done = this.async();

        var dataPath = path.resolve('app/scripts/cache/bower.js');
        var oldResult = null;
        var newItemsCount = 0;
        var options = {
            filter: ['website', 'name']
        };

        if( grunt.file.exists(dataPath) ) {
            oldResult = require(dataPath);
        }

        bowerList(options, function(err, data) {
            var result = {};
            _.each(data,function(item) {
                var pkg = item.name;
                result[pkg] = item.website;
                if( !oldResult[pkg] ) {
                    grunt.log.debug('Add: ' + pkg);
                    newItemsCount++;
                }
            });

            var total = data.length;
            var jsContent = _.template(template, {
                total: total,
                result: JSON.stringify(result, null, ' '),
                date: grunt.template.today('yyyy-mm-dd')
            });

            grunt.file.write(dataPath, jsContent);
            grunt.config.set('newBowerItems', newItemsCount);
            grunt.config.set('totalBowerItems', total);

            done();
        });
    });
};
