import { REQUIRE, REQUIRE_RESOLVE, IMPORT } from '../../../packages/helper-grammar-regex-collection/index.js';
import wrapKeyword from '../../wrap-keyword';
import preset from '../../pattern-preset';

export default class LiveResolver {

  getPattern() {
    return preset('JavaScript');
  }

  parseBlob(blob) {
    [REQUIRE, REQUIRE_RESOLVE, IMPORT].forEach((regex) => {
      wrapKeyword(blob.el, regex, {
        resolver: 'javascriptUniversal',
        target: '$1',
        path: blob.path,
      });
    });
  }
}
