'use strict';

var missingGithubLinks = {

  packageType: null,

  init: function() {
    var self = this;
    if( location.pathname.indexOf('/package.json') !== -1 ) {
      self.packageType = 'npm';
    } else if( location.pathname.indexOf('/bower.json') !== -1 ) {
      self.packageType = 'bower';
    } else {
      return;
    }

    $.getJSON(chrome.extension.getURL('data/' + self.packageType + '.json'), function( settings ) {
      self.registryList = settings.rows;
      self.updateDom();
    });
  },

  updateDom: function() {
    var self = this;

    $(".code-body a span").unwrap();

    var types = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
    var list = types.map(function( item ) {
      return self.getPackageNodes(item);
    });

    $.each(list, function( index, item ) {
      self.createLinkTag(item);
    });
  },

  getPackageNodes: function( selector ) {
    var root = $(".code-body .nt:contains('" + selector + "')");

    if( !root || root.length === 0 ) {
      return [];
    }

    var result = [];
    var el;
    var next = root.parent().next();

    if( next ) {
      while( next.children().length !== 1 ) {
        el = next.children().eq(0);
        result.push({
          el: el,
          pkgName: el.html().replace(/"/g, '')
        });
        next = next.next();
      }
    }
    return result;
  },

  createLinkTag: function( list ) {
    var self = this;

    $.each(list, function( index, item ) {
      var link = self.registryList[item.pkgName];
      var $link = $('<a>');

      if( !link && self.packageType === 'npm') {
        link = 'https://npmjs.org/package/' + item.pkgName;
      }

      if( link ) {
        $link.attr('href', link);
        item.el.wrap($link);
      } else {
        item.el.addClass('tooltipped').attr('original-title', 'Sorry, there is no link for this package available');
      }
    });
  }
};