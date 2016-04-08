import { basename } from 'path';
import replaceKeywords from '../helper-replace-keywords';
import { GEM } from '../helper-grammar-regex-collection/index.js';

export default class GemManifest {

  initialize() {
  }

  blobTypes() {
    return ['Ruby'];
  }

  parseBlob(blob) {
    if (basename(blob.path) !== 'Gemfile') {
      return;
    }

    replaceKeywords(blob.el, GEM, {
      resolver: 'resolverAPI',
      target: '$1',
      type: 'rubygems',
    }, '$1');
  }
}
