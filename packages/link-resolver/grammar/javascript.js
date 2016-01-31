import { REQUIRE, REQUIRE_RESOLVE, IMPORT } from '../../helper-grammar-regex-collection/index.js';
import tryLoad from '../../helper-try-load';
import bulkUrls from '../../helper-bulk-url-builder';
import builtins from 'builtins';
import { registerHandler } from '../../helper-click-handler';
import replaceKeywords from '../../helper-replace-keywords';

export default class JavaScript {

  constructor(blob) {
    registerHandler(this.constructor.name, this.clickHandler.bind(this));
    replaceKeywords(blob, [REQUIRE, REQUIRE_RESOLVE, IMPORT]);
  }

  clickHandler(data) {
    if (builtins.indexOf(data.value) > -1) {
      window.location.href = `https://nodejs.org/api/${data.value}.html`;
      return;
    }

    tryLoad(bulkUrls(data), (err, url) => {
      if (err) {
        return console.error(err);
      }

      if (url) {
        window.location.href = url;
      }
    });
  }
}
