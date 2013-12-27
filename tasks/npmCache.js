'use strict';

module.exports = function( grunt ) {

  // Internal libs
  var utils = require('./lib/utils').init(grunt);

  /**
   * Custom task to generate the npm registry cache
   */
  grunt.registerTask('npmCache', function() {
    var done = this.async();

    var list = null;
    var result = {};
    var noResult = [];
    var npmregistryFile = null;
    var countLeft = 0;
    var registryURL = 'http://isaacs.iriscouch.com/registry/_all_docs';
    var packageDetailURL = 'https://registry.npmjs.org/$1';
    var registryPath = 'app/data/npm.json';

    if( grunt.file.exists(registryPath) ) {
      npmregistryFile = JSON.parse(grunt.file.read(registryPath)).rows;
    }

    var worker = function() {

      if( list.length === 0 ) {
        writeToFile();
        return;
      }

      var pkg = list.shift().id;
      if( !pkg || pkg === '' ) {
        worker();
        return;
      }

      grunt.log.writeln('Cache: ' + pkg + ' | Remaining: ' + (--countLeft) );

      if( npmregistryFile && npmregistryFile[pkg] ) {
        grunt.log.debug('Allready in the store: ' + pkg);
        result[pkg] = npmregistryFile[pkg];
        worker();
        return;
      }

      var url = packageDetailURL.replace('$1', encodeURIComponent(pkg));

      utils.getResource({uri: url, cache: true}, function( err, response ) {

        if( err ) {
          grunt.log.errorlns("NPMCache: " + JSON.stringify(err));
          worker();
          return;
        }

        var repoURL = getRepoURL(response);

        if( repoURL ) {
          result[response.name] = repoURL;
          grunt.log.debug('Store: ' + response.name);
          worker();
        } else {
          githubSearch(encodeURIComponent(pkg), response);
        }
      });
    };

    var getRepoURL = function( response ) {

      if( response && response.name !== '' && response.repository && response.repository.url && response.repository.url !== '' ) {

        var url = response.repository.url;
        url = 'https://' + url.slice(url.indexOf('github.com'));
        url = url.replace('github.com:', 'github.com/');
        if( url.substr(-4) === '.git' ) {
          url = url.slice(0, -4);
        }
        return url;
      }

      return null;
    }

    var githubSearch = function( name, npmResponse ) {
      var uri = 'https://api.github.com/search/repositories?q=' + name + '+in:name&client_id=bd14f266dab45f3b7b48&client_secret=1abe498fe3496cb871a9ef776f11da6eecd61600';

      utils.getResource({uri: uri, cache: true, headers: {'User-Agent': 'npm-search'}}, function( err, response ) {

        if( err ) {

          var time = 5000;
          if( err.headers && err.headers['x-ratelimit-reset'] ) {
            time = ( err.headers['x-ratelimit-reset'] * 1000 - new Date().getTime() ) + 500;
          }

          grunt.log.errorlns('Try to request it again in ' + (time / 1000) + 's');
          setTimeout(function() {
            githubSearch(name, npmResponse);
          }, time);
          return;
        }

        if( response && response.total_count > 0 ) {
          for( var i = 0; i < response.items.length; i++ ) {
            if( compareDescription(response.items[i], npmResponse) ) {
              result[name] = response.items[0].html_url;
              break;
            }
          }
        }

        if( !result[name] ) {
          for( var i = 0; i < response.items.length; i++ ) {
            if( compareUsername(response.items[i], npmResponse) ) {
              result[name] = response.items[0].html_url;
              break;
            }
          }
        }

        if( !result[name] ) {
          grunt.log.debug('NoResult: ' + name);
          noResult.push(name);
        }

        worker();
      });
    };

    var compareDescription = function( githubItem, npmItem ) {

      if( githubItem.description && npmItem.description && githubItem.description.length > 1 && githubItem.description === npmItem.description ) {
        return true;
      }

      return false;
    };

    var compareUsername = function( githubItem, npmItem ) {

      var result = false;
      var githubUser = githubItem.owner.login;
      var npmUser = getUserFromNPM(npmItem);

      if(githubUser && npmUser) {
        result = githubUser.toLowerCase() === npmUser.toLowerCase();

      }

      return result;
    };

    var getUserFromNPM = function (response) {

      if (response.maintainers && response.maintainers.name && response.maintainers.name.length > 0) {
          return response.maintainers.name;
      }

      if (response.author && response.author.name && response.author.name.length > 0) {
          return response.author.name;
      }

      return null;
    };

    var writeToFile = function() {

      var content = {
        total: Object.keys(result).length,
        rows: result
      }
      grunt.file.write('app/data/npm.json', JSON.stringify(content, null, ' '));
      //grunt.file.write('app/data/npm_noresult.json', JSON.stringify(noResult, null, ' '));

      grunt.log.writeln('Content: ' + content.total);
      grunt.log.writeln('NoResult: ' + Object.keys(noResult).length);

      done();
    };

    utils.getResource({uri: registryURL, cache: true}, function( err, response ) {
      list = response.rows;
      countLeft = list.length;
      worker();
    });
  });
}