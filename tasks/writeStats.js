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
    var totalComposerItems = grunt.config.get('totalComposerItems');

    content = content.replace(/(npm: )[0-9]*/g, '$1'+ totalNPMItems)
      .replace(/(bower: )[0-9]*/g, '$1'+ totalBowerItems)
      .replace(/(composer: )[0-9]*/g, '$1'+ totalComposerItems)
      .replace(/(badge\/npm-)[0-9]*/g, '$1'+ totalNPMItems)
      .replace(/(badge\/bower-)[0-9]*/g, '$1'+ totalBowerItems)
      .replace(/(badge\/composer-)[0-9]*/g, '$1'+ totalComposerItems);

    grunt.file.write(filename, content);
  });
};
