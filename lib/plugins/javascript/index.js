import { REQUIRE, IMPORT, EXPORT } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';
import preset from '../../pattern-preset';

export default class JavaScript {

  getPattern() {
    return preset('JavaScript', 'CoffeeScript');
  }

  parseBlob(blob) {
    [REQUIRE, IMPORT, EXPORT].forEach((regex) => {
      insertLink(blob.el, regex, {
        resolver: 'javascriptUniversal',
        target: '$1',
        path: blob.path,
      });
    });
  }
}
