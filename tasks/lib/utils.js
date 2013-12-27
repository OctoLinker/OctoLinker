'use strict';

// External libs.
var request = require('request');

exports.init = function( grunt ) {
  var exports = {};

  exports.getResource = function( options, cb ) {

    var cachePath = '';
    if( options.cache ) {
      cachePath = getCachePathFromURI(options.uri);
      if( grunt.file.exists(cachePath) ) {
        grunt.log.debug('Get from cache: ' + options.uri);
        setTimeout(function() {
          cb(null, JSON.parse(grunt.file.read(cachePath)));
        }, 0);
        return;
      }
    }

    // http://stackoverflow.com/questions/18461979/node-js-error-with-ssl-unable-to-verify-leaf-signature
    if( options.rejectUnauthorized === undefined ) {
      options.rejectUnauthorized = false;
    }

    options.timeout = 5000;

    grunt.log.debug('Request: ' + options.uri);
    request.get(options, function( error, response, body ) {

      if( !error && response.statusCode == 200 ) {
        if( options.cache ) {
          grunt.file.write(cachePath, body);
        }
        cb(null, JSON.parse(body));
        return;
      }

      cb(response, null);
    });
  };

  var getCachePathFromURI = function( uri ) {
    return 'cache/' + uri.replace(':', '');
  }

  return exports;
};