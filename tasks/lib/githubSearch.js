'use strict';

// External libs.
var _ = require('lodash');


exports.init = function (grunt) {

  var utils = require('./utils').init(grunt);

  var exports = {};

  var clientId = process.env.GITHUB_CLIENT_ID;
  var clientSecret = process.env.GITHUB_CLIENT_SECRET;

  var searchURI = 'https://api.github.com/search/repositories?q=$1&client_id=' + clientId + '&client_secret=' + clientSecret;
  var rawURI = 'https://raw2.github.com/$1/master/package.json';

  exports.go = function (npmResponse, next) {

    requestSearchAPI(npmResponse, next);
  }

  var requestSearchAPI = function(npmResponse, next) {

    var name = npmResponse.name;

    var uri = searchURI.replace('$1', name + '+in:name');
    utils.getResource({uri: uri, cache: true, headers: {'User-Agent': 'npm-search-v2'}}, function (err, response, body) {


      if(response && body && response.statusCode === 200) {

        // TODO handle more than 20 results
        if(body.total_count > 20) {
          utils.writeLog('More than 20 results for ' + name);
          return next(null);
        }

        getPackageFile(body.items, npmResponse, function(result) {
          next(result);
        });

        return;
      }

      if( response && response.statusCode === 403 ) {
        var time = 5000;
        if( response.headers['x-ratelimit-reset'] ) {
          time = ( response.headers['x-ratelimit-reset'] * 1000 - new Date().getTime() ) + 500;
        }
        grunt.log.errorlns('Try to request it again in ' + (time / 1000) + 's');
        utils.writeLog('Try to request it again in ' + (time / 1000) + 's : ' + name);
        setTimeout(function() {
          requestSearchAPI(npmResponse, next);
        }, time);
        return;
      }

      next(null);
    });
  };

  var getPackageFile = function(items, npmResponse, next) {
    grunt.log.debug('getPackageFile');

    var item = items.shift();

    if(!item) {
      return next(null);
    }

    var uri = rawURI.replace('$1', item.full_name);
    utils.getResource({uri: uri, cache: true}, function (err, response, body) {

      if( err ) {
        utils.writeLog('getPackageFile ' + uri);
        getPackageFile(items, npmResponse, next);
        return;
      }

      if(response.statusCode !== 200) {
        grunt.log.debug('statusCode: ' + response.statusCode);
        return getPackageFile(items, npmResponse, next);
      }

      var pkg = body;
      var sameRepoName = compareStrings(pkg.name, npmResponse.name);
      var sameDescription = compareStrings(pkg.description, npmResponse.description);
      var sameVersion = compareVersion(pkg.version, npmResponse);

      grunt.log.debug('sameDescription '+ sameDescription);
      grunt.log.debug('sameRepoName '+ sameRepoName);
      grunt.log.debug('sameVersion '+ sameVersion);

      if(sameRepoName && sameDescription && sameVersion) {
        next(item.html_url);
        return;
      }

      getPackageFile(items, npmResponse, next);
    });
  }

  var compareStrings = function( github, npm ) {
    if( github && npm && github.length > 1 && github === npm ) {
      return true;
    }
    return false;
  };

  var compareVersion = function( pkgVersion, npmResponse ) {
    if( pkgVersion && npmResponse && npmResponse.versions ) {
      return Object.keys(npmResponse.versions).indexOf(pkgVersion) !== -1;
    }
    return false;
  };

  return exports;
};
