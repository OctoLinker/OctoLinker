import { REQUIRE, REQUIRE_RESOLVE, IMPORT } from '../helper-grammar-regex-collection/index.js';
import replaceKeywords from '../helper-replace-keywords';

export default class LiveResolver {

  initialize() {
  }

  blobTypes() {
    return ['JavaScript'];
  }

  parseBlob(blob) {
    [REQUIRE, REQUIRE_RESOLVE, IMPORT].forEach((regex) => {
      replaceKeywords(blob.el, regex, {
        resolver: 'javascriptUniversal',
        target: '$1',
        path: blob.path,
      });
    });
  }
}
