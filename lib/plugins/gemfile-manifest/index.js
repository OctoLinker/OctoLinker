import { GEM } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';

export default class GemManifest {

  getPattern() {
    return ['Gemfile'];
  }

  parseBlob(blob) {
    insertLink(blob.el, GEM, {
      resolver: 'resolverAPI',
      target: '$1',
      type: 'rubygems',
    });
  }
}
