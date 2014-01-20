'use strict';

module.exports = function (grunt) {

  /**
   * Custom task to generate the changelog file
   */
  grunt.registerTask('writeChangelog', function () {

    var filename = 'CHANGELOG.md';
    var versionFile = 'app/manifest.json';
    var header = '#Changelog\n\n';
    var output = '';
    var version = null;

    var date = grunt.template.today('yyyy-mm-dd');

    if (grunt.file.exists(versionFile)) {
      version = JSON.parse(grunt.file.read(versionFile)).version;
    }

    output += '## ';
    if (version) {
      output += version + ' - ';
    }
    output += date + '\n';


    var newBowerItems = grunt.config.get('newBowerItems');
    var newNPMItems = grunt.config.get('newNPMItems');

    if (newBowerItems || newNPMItems) {
      output += '- Add ';
      if (newBowerItems && newNPMItems) {
        output += newNPMItems + ' NPM and ' + newBowerItems + ' Bower';
      } else if (newBowerItems) {
        output += newBowerItems + ' Bower';
      } else if (newNPMItems) {
        output += newNPMItems + ' NPM';
      }
      output += ' links.\n'
    }

    output += '\n';

    if (grunt.file.exists(filename)) {
      var content = grunt.file.read(filename);
      output = content.replace(header, header + output);
    } else {
      output = header + output;
    }
    grunt.file.write(filename, output);
  });
};