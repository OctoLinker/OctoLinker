import { HTML_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import preset from '../pattern-preset';
import relativeFile from '../resolver/relative-file.js';

export default class HTML {

  static resolve({ target, path }) {
    return [
      relativeFile({ path, target }),
    ];
  }

  getPattern() {
    return preset('html');
  }

  parseBlob(blob) {
    insertLink(blob.el, HTML_IMPORT, {
      pluginName: this.constructor.name,
      target: '$1',
      path: blob.path,
    });
  }
}
