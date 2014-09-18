'use strict';

var githubURLParser = require('github-url-from-git');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var reqeust = require('request');
var JSONStream = require('JSONStream');
var es = require('event-stream');

module.exports = function(grunt) {

    grunt.registerTask('bowerCache', function() {
        var done = this.async();

        var options = {
            uri: 'https://bower-component-list.herokuapp.com',
            jsonStreamPath: '*',
            filter: ['name', 'website']
        };

        var dataPath = path.resolve('app/scripts/cache/bower.js');
        var oldResult = {};
        if (fs.existsSync(dataPath)) {
            oldResult = require(dataPath);
        }

        var filter = es.mapSync(function(item) {
            if (options.filter && Array.isArray(options.filter)) {
                item = _.pick(item, options.filter);
            }
            if (options.transformer && _.isFunction(options.transformer)) {
                item = options.transformer(item);
            }
            return item;
        });

        var repoParser = es.map(function(item, cb) {
            totalCount++;
            if (!oldResult[item.name]) {
                newItemsCount++;
            }
            cb(null, [item.name, item.website]);
        });

        var totalCount = 0;
        var newItemsCount = 0;

        var handleEnd = function() {
            grunt.log.writeln('newItemsCount: ' + newItemsCount);
            grunt.log.writeln('totalBowerItems: ' + totalCount);
            grunt.config.set('newBowerItems', newItemsCount);
            grunt.config.set('totalBowerItems', totalCount);
            done();
        };

        var handleData = function(data) {
            grunt.log.writeln(data.name);
        };

        reqeust.get(options.uri)
        .pipe(JSONStream.parse(options.jsonStreamPath))
        .pipe(filter)
        .on('data', handleData)
        .pipe(repoParser)
        .pipe(JSONStream.stringifyObject('module.exports = {\n', ',\n', '\n}\n'))
        .pipe(fs.createWriteStream(dataPath))
        .on('finish', handleEnd);
    });
};
