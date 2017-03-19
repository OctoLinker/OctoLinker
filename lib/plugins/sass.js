import { join } from 'path';
import pathParse from 'path-parse';
import { CSS_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import preset from '../pattern-preset';
import relativeFile from '../resolver/relative-file.js';

export default class Sass {

  static resolve({ path, target }) {
    const { dir, name } = pathParse(target);
    const prefixedTarget = join(dir, `_${name}`);

    return [
      relativeFile({ path, target: `${prefixedTarget}.scss` }),
      relativeFile({ path, target: `${prefixedTarget}.sass` }),
    ];
  }

  getPattern() {
    return preset('sass');
  }

  parseBlob(blob) {
    insertLink(blob.el, CSS_IMPORT, {
      pluginName: this.constructor.name,
      target: '$1',
      path: blob.path,
    });
  }
}
