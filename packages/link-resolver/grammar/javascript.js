import {REQUIRE, REQUIRE_RESOLVE, IMPORT} from '../../helper-grammar-regex-collection/index.js';
import tryLoad from '../../helper-try-load';
import bulkUrls from '../../helper-bulk-url-builder';
import Base from './base.js';
import builtins from 'builtins';

export default class JavaScript extends Base {

  regexList() {
    return [REQUIRE, REQUIRE_RESOLVE, IMPORT];
  }

  clickHandler(data) {
    if (!this.apiPage(data)) {
      this.loadFile(data);
    }
  }

  apiPage({value}) {
    if (builtins.indexOf(value) === -1) {
      return false;
    }

    window.location.href = `https://nodejs.org/api/${value}.html`;
    return true;
  }

  loadFile(data) {
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
