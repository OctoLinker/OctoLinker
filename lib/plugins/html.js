import { HTML_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';
import relativeFile from '../resolver/relative-file.js';

export default class HTML {

  static resolve({ target, path }) {
    return [
      relativeFile({ path, target }),
    ];
  }

  static getPattern() {
    return {
      pathPatterns: [
        '.html$',
        '.htm$',
      ],
      githubClasses: [
        'type-html',
      ],
    };
  }

  static getLinkRegexes() {
    return HTML_IMPORT;
  }
}
