import { CSS_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import preset from '../pattern-preset';
import relativeFile from '../resolver/relative-file.js';

export default class CSS {

  static resolve({ target, path }) {
    return [
      relativeFile({ path, target }),
    ];
  }

  getPattern() {
    return preset('css');
  }

  parseBlob(blob) {
    insertLink(blob.el, CSS_IMPORT, {
      pluginName: this.constructor.name,
      target: '$1',
      path: blob.path,
    });
  }
}
