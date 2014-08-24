'use strict';

var npmList = require('npm-list');
var githubURLParser = require('github-url-from-git');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var reqeust = require('request');
var JSONStream = require('JSONStream');
var es = require('event-stream');

module.exports = function(grunt) {

    var parseURL = function(url) {

        // Remove last trailing slash
        if (url.slice(-1) === '/') {
            url = url.slice(0, -1);
        }
        // Fix multiple forward slashes
        url = url.replace(/([^:]\/)\/+/g, '$1');

        // Resolve shorthand url to a qualified URL
        if (url.split('/').length === 2) {
            url = 'http://github.com/' + url;
        }

        // Replace and fix invalid urls
        url = url.replace('https+git://', 'git+https://');
        url = url.replace('://www.github.com', '://github.com');

        // Resolve detail link
        url = url.split('/tree/master')[0];
        url = url.split('/blob/master')[0];

        var githubUrl = githubURLParser(url);
        if (githubUrl) {
            return githubUrl;
        }
    };

    var getRepoURL = function(node) {
        if (typeof node === 'string') {
            return parseURL(node);
        } else if (node.url) {
            return parseURL(node.url);
        } else if (node.path) {
            return parseURL(node.path);
        } else if (node.web) {
            return parseURL(node.web);
        } else if (node.git) {
            return parseURL(node.git);
        }
    };

    var lookup = function(node) {
        if (Array.isArray(node)) {
            return getRepoURL(node[0]);
        } else {
            return getRepoURL(node);
        }
    };

    var getURL = function(node) {
        var result = null;

        if (node.repository) {
            result = lookup(node.repository);
        }
        if (!result && node.repositories) {
            result = lookup(node.repositories);
        }
        if (!result && node.homepage) {
            result = parseURL(node.homepage);
        }

        return result;
    };

    grunt.registerTask('npmCache', function() {
        var done = this.async();

        var options = {
            uri: 'http://isaacs.iriscouch.com/registry/_all_docs?include_docs=true',
            jsonStreamPath: 'rows.*.doc',
            filter: ['name', 'repository', 'repositories', 'homepage']
        };

        var dataPath = path.resolve('app/scripts/cache/npm.js');
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
            var repoURL = getURL(item);
            if (!repoURL) {
                return cb();
            }
            totalCount++;
            if (!oldResult[item.name]) {
                newItemsCount++;
            }
            cb(null, [item.name, repoURL]);
        });

        var totalCount = 0;
        var newItemsCount = 0;

        var handleEnd = function() {
            grunt.log.writeln('newItemsCount: ' + newItemsCount);
            grunt.log.writeln('totalNPMItems: ' + totalCount);
            grunt.config.set('newNPMItems', newItemsCount);
            grunt.config.set('totalNPMItems', totalCount);
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
