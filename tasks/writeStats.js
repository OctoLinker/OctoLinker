'use strict';

module.exports = function (grunt) {

  /**
   * Custom task to generate the changelog file
   */
  grunt.registerTask('writeStats', function () {

    var filename = 'README.md';
    var content = grunt.file.read(filename);

    var totalBowerItems = grunt.config.get('totalBowerItems');
    var totalNPMItems = grunt.config.get('totalNPMItems');

    content = content.replace(/(NPM packages: )[0-9]*/g, '$1'+ totalNPMItems)
      .replace(/(bower packages: )[0-9]*/g, '$1'+ totalBowerItems);

    grunt.file.write(filename, content);
  });
};