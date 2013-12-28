'use strict';

module.exports = function( grunt ) {

  // Internal libs
  var utils = require('./lib/utils').init(grunt);

  /**
   * Custom task to generate the bower registry cache
   */
  grunt.registerTask('bowerCache', function() {
    var done = this.async();

    var url = 'https://bower-component-list.herokuapp.com';
    utils.getResource({uri: url}, function( err, response ) {

      var result = {};
      var item = null;

      for( var i = 0; i < response.length; i++ ) {
        item = response[i];
        result[item.name] = item.website;
      }

      var content = {
        total: Object.keys(result).length,
        rows: result
      }
      grunt.file.write('app/data/bower.json', JSON.stringify(content, null, ' '));

      done();
    });
  });
};