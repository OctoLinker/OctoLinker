'use strict';

module.exports = function( grunt ) {

  // Internal libs
  var utils = require('./lib/utils').init(grunt);
  var npmSearch = require('./lib/npmSearch').init();
  var githubSearch = require('./lib/githubSearch').init(grunt);
  var _ = require('lodash');


  var registryURL = 'http://isaacs.iriscouch.com/registry/_all_docs';
  var packageDetailURL = 'https://registry.npmjs.org/$1';
  var dataPath = 'app/data/npm.json';
  var registryPath = 'data/npm.json';
  var noresultPath = 'data/npm_noresult.json';
  var qualityCount = [];

  /**
   * Custom task to generate the npm registry cache
   */
  grunt.registerTask('npmCache', function() {
    var done = this.async();

    var queue = [];
    var result = {};
    var noResult = {};
    var countTotal = 0;
    var workerCount = 0;
    var newItemsCount = 0;
    var currentPackageName = '';

    if( grunt.file.exists(registryPath) ) {
      var content = JSON.parse(grunt.file.read(registryPath));
      result = content.rows;
      qualityCount = content.qualityCount;
    }

    if( grunt.file.exists(noresultPath) ) {
      var content = JSON.parse(grunt.file.read(noresultPath));
      noResult = content;
    }

    var init = function() {

      utils.getResource({uri: registryURL}, function( err, response, body ) {
        if( err ) {
          grunt.fail.warn(err);
        }
        queue = _.pluck(body.rows, 'id');

        var _result = Object.keys(result);
        var _noResult = Object.keys(noResult);

        if( _result.length ) {
          queue = _.difference(queue, _result);
        }
        if( _noResult.length ) {
          queue = _.difference(queue, _noResult);
        }
        worker();
      });
    };

    var complete = function() {
      grunt.log.debug('complete');
      writeToFile();
      done();
    };

    var worker = function() {
      setTimeout(_worker, 0);
    }

    var _worker = function() {

      if( queue.length === 0 ) {
        complete();
        return;
      }

      if( workerCount === 0 ) countTotal = queue.length;
      workerCount++;

      currentPackageName = queue.shift();
      if( queue.length === 0 ) {
        worker();
        return;
      }

      if(workerCount % 20 == 0) {
        writeToFile();
      }

      grunt.log.writeln('Remaining: ' + ( countTotal - workerCount ) + '  Cache: ' + currentPackageName);

      var url = packageDetailURL.replace('$1', encodeURIComponent(currentPackageName));

      utils.getResource({uri: url, cache: true}, function( err, response, body ) {

        if( err || (response && response.statusCode !== 200)) {
          utils.writeLog('Package: ' + currentPackageName + '\nError:' + JSON.stringify(err));
          //queue.push(currentPackageName);
          worker();
          return;
        }

        npmSearch.go(body, function(repoURL) {
          if(repoURL) {
            store(repoURL, 0);
            worker();
          } else {
            githubSearch.go(body, function(repoURL) {
              if(repoURL) {
                store(repoURL, 1);
              } else {
                storeNoResult();
              }
              worker();
            });
          }
        });
      });
    };

    var store = function( url, quality ) {
      grunt.log.debug('Store (' + quality + ') : ' + currentPackageName);
      result[currentPackageName] = {
        url: url,
        date: grunt.template.today('yyyy-mm-dd'),
        quality: quality
      };

      if(qualityCount[quality] === undefined) qualityCount[quality] = 0;
      qualityCount[quality]++;

      newItemsCount++;
    };

    var storeNoResult = function() {
      grunt.log.debug('NoResult: ' + currentPackageName);
      noResult[currentPackageName] = currentPackageName;
    };

    var writeToFile = function() {
      var content = {
        qualityCount: qualityCount,
        noResultCount: Object.keys(noResult).length,
        total: Object.keys(result).length,
        rows: result
      }

      var map = {};
      _.each(result, function(item, key) {
        map[key] = item.url;
      });

      var contentMap = {
        total: Object.keys(map).length,
        rows: map
      }

      grunt.file.write(dataPath, JSON.stringify(contentMap, null, ' '));
      grunt.file.write(registryPath, JSON.stringify(content, null, ' '));
      grunt.file.write(noresultPath, JSON.stringify(noResult, null, ' '));

      grunt.log.writeln('Content: ' + content.total);
      grunt.log.writeln('NoResult: ' + Object.keys(noResult).length);
      grunt.log.writeln('QualityCount: ' + JSON.stringify(qualityCount));
      grunt.log.writeln('queue: ' + queue.length);
      grunt.log.writeln('newItemsCount: ' + newItemsCount);
      grunt.config.set('newNPMItems', newItemsCount);
    };

    init();
  });
}