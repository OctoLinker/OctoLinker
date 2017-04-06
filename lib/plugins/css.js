import { CSS_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import relativeFile from '../resolver/relative-file.js';

export default class CSS {

  static resolve({ target, path }) {
    return [
      relativeFile({ path, target }),
    ];
  }

  static getPattern() {
    return {
      pathPatterns: ['.css$'],
      githubClasses: [
        'type-css',
        'highlight-source-css',
      ],
    };
  }

  parseBlob(blob) {
    insertLink(blob.el, CSS_IMPORT, {
      pluginName: this.constructor.name,
      target: '$1',
      path: blob.path,
    });
  }
}
