import { HOMEBREW } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';
import preset from '../../pattern-preset';
import { dirname } from 'path';

export default class HomebrewManifest {

  getPattern() {
    // We could maybe be a little more specific here, but I doubt the
    // HOMEBREW pattern shows up in unrelated Ruby files. Note that we want to
    // match not only files in https://github.com/Homebrew/homebrew-core, but
    // also files in https://github.com/Linuxbrew/homebrew-core, the other
    // formulae repositories ("taps") listed at https://github.com/Homebrew/
    // and https://github.com/Linuxbrew, as well as the many other taps that
    // various people have created. Here are a couple of searches that
    // illustrate where "depends_on" and "conflicts_with" appear in Ruby files:
    // * https://github.com/search?l=ruby&langOverride=&q=depends_on&repo=&start_value=1&type=Code
    // * https://github.com/search?l=ruby&langOverride=&q=conflicts_with&repo=&start_value=1&type=Code
    return preset('Ruby');
  }

  parseBlob(blob) {
    insertLink(blob.el, HOMEBREW, {
      resolver: 'relativeFile',
      path: blob.path,
      target: '$1.rb',
    });
  }
}
