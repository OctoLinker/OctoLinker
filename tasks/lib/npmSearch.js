'use strict';

// External libs.
var _ = require('lodash');

exports.init = function () {
  var exports = {};

  exports.go = function (response, done) {
    var result = null;

    if (!response) {
      return done(result);
    }

    result = getURL(response);

    if (!result && response.versions) {
      var row = _.find(response.versions, function (item) {
        return getURL(item) !== null;
      });
      if (row) {
        result = getURL(row);
      }
    }

    done(result);
  }

  var getURL = function (node) {
    if (node.repository && node.repository.url) {
      return parseURL(node.repository.url);
    }
    if (node.repository && node.repository.path) {
      return parseURL(node.repository.path);
    }
    if (node.repositories && node.repositories.length === 1 && node.repositories[0].url) {
      return parseURL(node.repositories[0].url);
    }
    if (node.repositories && node.repositories.length === 1 && node.repositories[0].path) {
      return parseURL(node.repositories[0].path);
    }
    if(node.homepage && node.homepage.length) {
      return parseURL(node.homepage);
    }

    return null;
  }

  var parseURL = function (url) {

    if (!url || url.length === 0 || url.indexOf('github.com') === -1) {
      return null;
    }

    url = 'https://' + url.slice(url.indexOf('github.com'));
    url = url.replace('github.com:', 'github.com/');
    if (url.substr(-4) === '.git') {
      url = url.slice(0, -4);
    }
    return url;
  }

  return exports;
};