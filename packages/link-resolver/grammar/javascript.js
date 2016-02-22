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
    const { value } = data;

    const isPath = !!value.match(/^\.\.?[\\|/]?/);
    const isBuildIn = builtins.indexOf(value) > -1;

    if (isBuildIn) {
      window.location.href = `https://nodejs.org/api/${value}.html`;
      return;
    }

    let urls;
    if (isPath) {
      urls = bulkUrls(data);
    } else {
      urls = [
        `https://githublinker.herokuapp.com/q/npm/${value}`,
        `https://githublinker.herokuapp.com/q/bower/${value}`,
      ];
    }

    tryLoad(urls, {
      type: (isPath) ? undefined : 'GET',
    }, (err, url, res) => {
      if (err) {
        return console.error(err);
      }

      const goto = (res && res.url) ? res.url : url;
      if (goto) {
        window.location.href = goto;
      }
    });
  }
}
