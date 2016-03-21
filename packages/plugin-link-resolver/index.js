import { REQUIRE, REQUIRE_RESOLVE, IMPORT } from '../helper-grammar-regex-collection/index.js';
import replaceKeywords from '../helper-replace-keywords';
import { registerHandler } from '../helper-click-handler';
import javaScriptClickHandler from '../grammar-javascript';

export default class LiveResolver {

  initialize() {
    registerHandler('JavaScript', this.clickHandler.bind(this));
  }

  blobTypes() {
    return ['JavaScript'];
  }

  clickHandler(data) {
    const { value, path } = data;
    javaScriptClickHandler(value, path);
  }

  parseBlob(blob) {
    [REQUIRE, REQUIRE_RESOLVE, IMPORT].forEach((regex) => {
      replaceKeywords(blob.el, regex, {
        value: '$1',
        type: blob.type,
        path: blob.path,
      });
    });
  }
}
