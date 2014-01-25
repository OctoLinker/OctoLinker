'use strict';

module.exports = function( grunt ) {

  // Internal libs
  var utils = require('./lib/utils').init(grunt);

  /**
   * Custom task to generate the bower registry cache
   */
  grunt.registerTask('bowerCache', function() {
    var done = this.async();

    var dataPath = 'app/data/bower.js';
    var registryPath = 'data/bower.json';
    var url = 'https://bower-component-list.herokuapp.com';
    var result = {};
    var newItemsCount = 0;

    if( grunt.file.exists(registryPath) ) {
      result = JSON.parse(grunt.file.read(registryPath)).rows;
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

      var content = {
        total: Object.keys(result).length,
        rows: result
      }

      var jsContent = 'var bowerRegistry = ' + JSON.stringify(content, null, ' ') + ';';

      grunt.file.write(dataPath, jsContent);
      grunt.file.write(registryPath, JSON.stringify(content, null, ' '));

      grunt.log.writeln('newItemsCount: ' + newItemsCount);
      grunt.config.set('newBowerItems', newItemsCount);

      done();
    });
  });
};