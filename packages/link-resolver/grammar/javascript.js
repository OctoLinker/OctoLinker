import { REQUIRE, REQUIRE_RESOLVE, IMPORT } from '../../helper-grammar-regex-collection/index.js';
import tryLoad from '../../helper-try-load';
import builtins from 'builtins';
import { registerHandler } from '../../helper-click-handler';
import replaceKeywords from '../../helper-replace-keywords';
import { join, dirname, extname } from 'path';

function buildBulkUrls(data) {
  const list = [];
  const extName = ['.js', '.json'];
  const { path, value } = data;
  let basePath = join(dirname(path), value);
  const pathExt = extname(path);
  const fileExt = extname(basePath);

  if (fileExt) {
    basePath = basePath.replace(fileExt, '');
  }

  if (pathExt && !extName.includes(pathExt)) {
    extName.unshift(pathExt);
  }

  if (fileExt && !extName.includes(fileExt)) {
    extName.unshift(fileExt);
  }

  extName.forEach((ext) => {
    list.push(ext);
    list.push(`/index${ext}`);
  });

  list.push('');

  return list.map((file) => {
    return 'https://github.com' + basePath + file;
  });
}

export default class JavaScript {

  constructor(blob) {
    registerHandler(this.constructor.name, this.clickHandler.bind(this));
    replaceKeywords(blob, [REQUIRE, REQUIRE_RESOLVE, IMPORT]);
  }

  clickHandler(data) {
    let urls = [];
    const { value } = data;

    const isPath = !!value.match(/^\.\.?[\\|/]?/);
    const isBuildIn = builtins.indexOf(value) > -1;

    if (isBuildIn) {
      window.location.href = `https://nodejs.org/api/${value}.html`;
      return;
    }

    if (isPath) {
      urls = buildBulkUrls(data);
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
