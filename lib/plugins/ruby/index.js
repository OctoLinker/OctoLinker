import { REQUIRE } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';
import preset from '../../pattern-preset';

export default class Ruby {

  getPattern() {
    return preset('Ruby');
  }

  parseBlob(blob) {
    insertLink(blob.el, REQUIRE, {
      resolver: 'rubyUniversal',
      target: '$1',
      path: blob.path,
    });
  }
}
