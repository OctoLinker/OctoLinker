import { CSS_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';
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

  static getLinkRegexes() {
    return CSS_IMPORT;
  }
}
