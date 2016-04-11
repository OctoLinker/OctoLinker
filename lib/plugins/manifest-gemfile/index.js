import { basename } from 'path';
import { GEM } from '../../../packages/helper-grammar-regex-collection/index.js';
import wrapKeyword from '../../wrap-keyword';

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

    wrapKeyword(blob.el, GEM, {
      resolver: 'resolverAPI',
      target: '$1',
      type: 'rubygems',
    });
  }
}
