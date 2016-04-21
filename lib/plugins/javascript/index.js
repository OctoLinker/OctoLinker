import { REQUIRE, REQUIRE_RESOLVE, IMPORT } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';
import preset from '../../pattern-preset';

export default class JavaScript {

  getPattern() {
    return preset('JavaScript');
  }

  parseBlob(blob) {
    [REQUIRE, REQUIRE_RESOLVE, IMPORT].forEach((regex) => {
      insertLink(blob.el, regex, {
        resolver: 'javascriptUniversal',
        target: '$1',
        path: blob.path,
      });
    });
  }
}
