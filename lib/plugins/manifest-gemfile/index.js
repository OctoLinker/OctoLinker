import { GEM } from '../../../packages/helper-grammar-regex-collection/index.js';
import wrapKeyword from '../../wrap-keyword';

export default class GemManifest {

  getPattern() {
    return ['Gemfile'];
  }

  parseBlob(blob) {
    wrapKeyword(blob.el, GEM, {
      resolver: 'resolverAPI',
      target: '$1',
      type: 'rubygems',
    });
  }
}
