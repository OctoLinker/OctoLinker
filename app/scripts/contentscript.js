'use strict';

var missingGithubLinks = {

  packageType: null,

  init: function( type ) {
    if( !type ) {
      return;
    }

    this.packageType = type;

    try {
      this._run();
    } catch(err) {
      console.error(err);
    }
  },

  _run: function() {

    var self = this;
    if(self.packageType === 'npm') {
      self.registryList = npmRegistry.rows;
    }else if(self.packageType === 'bower') {
      self.registryList = bowerRegistry.rows;
    }

    self._updateDom();
  },

  _updateDom: function() {
    var self = this;

    $(".code-body a span").unwrap();

    var types = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
    var list = types.map(function( item ) {
      return self._getPackageNodes(item);
    });

    $.each(list, function( index, item ) {
      self._createLinkTag(item);
    });
  },

  _getPackageNodes: function( selector ) {
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

  _createLinkTag: function( list ) {
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