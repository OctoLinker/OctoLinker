'use strict';

// External libs.
var request = require('request');
var crypto = require('crypto');
var url = require('url');

exports.init = function( grunt ) {
  var exports = {};

  exports.writeLog = function( msg ) {
    var filename = 'error.log';
    var output = '';

    if( grunt.file.exists(filename) ) {
      output = grunt.file.read(filename);
    }

    grunt.log.errorlns(msg);
    output += new Date().toString() + '\n' + msg + '\n\n';

    grunt.file.write(filename, output);
  }

  exports.getResource = function( options, cb ) {

    options.cache = true;

    if( options.cache ) {
      var cache = readCacheFile(options.uri);
      if( cache ) {
        grunt.log.debug('Read from cache: ' + options.uri);
        cb(null, {statusCode: 200}, cache);
        return;
      }
    }

    // http://stackoverflow.com/questions/18461979/node-js-error-with-ssl-unable-to-verify-leaf-signature
    if( options.rejectUnauthorized === undefined ) {
      options.rejectUnauthorized = false;
    }

    options.timeout = 5000;

    grunt.log.debug('Send request: ' + options.uri);

    request.get(options, function( error, response, body ) {
      if( !error && response.statusCode == 200 ) {
        if( options.cache ) {
          writeCacheFile(options.uri, body);
        }
        cb(null, response, JSON.parse(body));
        return;
      }
      cb(error || {message:'STATUS_CODE_NOT_200'}, response, null);
    });
  };

  var writeCacheFile = function( uri, content ) {
    var prefix = 'cache/' + url.parse(uri).hostname + '/';
    var cacheFile = prefix + crypto.createHash('sha1').update(uri).digest('hex');
    grunt.file.write(cacheFile, content);
  }

  var readCacheFile = function( uri ) {

    var prefix = 'cache/' + url.parse(uri).hostname + '/';
    var cacheFile = prefix + crypto.createHash('sha1').update(uri).digest('hex');

    if( cacheFile ) {
      if( grunt.file.exists(cacheFile) ) {
        return JSON.parse(grunt.file.read(cacheFile));
      }
    }
    return null;
  }

  return exports;
};