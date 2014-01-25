'use strict';

var missingGithubLinks = {

  packageType: null,

  init: function( type ) {
    if( !type ) {
      return;
    }

    var self = this;
    if(type === 'npm') {
      self.registryList = npmRegistry.rows;
    }else if(type === 'bower') {
      self.registryList = bowerRegistry.rows;
    }

    self.updateDom();
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

      if( !link && self.packageType === 'npm' ) {
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