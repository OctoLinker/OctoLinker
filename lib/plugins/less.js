import { LESS_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';
import relativeFile from '../resolver/relative-file.js';
import githubSearch from '../resolver/github-search.js';

export default class Less {

  static resolve({ path, target }) {
    return [
      relativeFile({ path, target }),
      githubSearch({ path, target }),
    ];
  }

  static getPattern() {
    return {
      pathPatterns: ['.less$'],
      githubClasses: [
        'type-less',
        'highlight-source-css-less',
      ],
    };
  }

  static getLinkRegexes() {
    return LESS_IMPORT;
  }
}
