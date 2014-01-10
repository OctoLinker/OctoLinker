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

    if( options.cache ) {
      var cache = readCacheFile(options.uri);
      if( cache ) {
        grunt.log.writeln('cached: ' + options.uri);

        var body = null;
        if(cache.statusCode === 200) {
          body = JSON.parse(cache.body);
        }

        cb(null, {statusCode:cache.statusCode}, body);
        return;
      }
    }

    // http://stackoverflow.com/questions/18461979/node-js-error-with-ssl-unable-to-verify-leaf-signature
    if( options.rejectUnauthorized === undefined ) {
      options.rejectUnauthorized = false;
    }

    options.timeout = 5000;

    grunt.log.writeln('fetching: ' + options.uri);

    request.get(options, function( error, response, body ) {

      if(error) {
        exports.writeLog('getResource error ' + options.uri);
        exports.getResource(options, cb);
        return;
      }

      if(!error && response) {
        if( options.cache && response.statusCode !== 403  ) {
          if(response.statusCode !== 200) {
            body = '';
          } else {
            try{
              JSON.parse(body);
            }catch(e) {
              exports.writeLog('JSON PARSE ERROR ' + options.uri);
              cb(e, response, null);
              return;
            }
          }
          writeCacheFile(options.uri, response, body);
        }

        if( response.statusCode == 200 ) {
            cb(null, response, JSON.parse(body));
            return;
        }
      }
      cb(error, response, null);
    });
  };

  var writeCacheFile = function( uri, response, body ) {
    grunt.log.debug('writeCacheFile');

    var prefix = 'cache/' + url.parse(uri).hostname + '/';
    var cacheFile = prefix + crypto.createHash('sha1').update(uri).digest('hex');
    var content = {
      body: body,
      statusCode: response.statusCode
    }

    grunt.log.debug('Write: ' + cacheFile);
    grunt.file.write(cacheFile, JSON.stringify(content));
  }

  var readCacheFile = function( uri ) {
    grunt.log.debug('readCacheFile');

    var prefix = 'cache/' + url.parse(uri).hostname + '/';
    var cacheFile = prefix + crypto.createHash('sha1').update(uri).digest('hex');

    if( cacheFile ) {
      if( grunt.file.exists(cacheFile) ) {
        grunt.log.debug('Read: ' + cacheFile);
        return JSON.parse(grunt.file.read(cacheFile));
      }
    }
    return null;
  }

  return exports;
};