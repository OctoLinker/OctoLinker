import { CSS_IMPORT } from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '../resolver/relative-file.js';

export default {
  name: 'CSS',

  resolve({ target, path }) {
    return [relativeFile({ path, target })];
  },

  getPattern() {
    return {
      pathRegexes: [/\.css$/],
      githubClasses: ['type-css', 'highlight-source-css'],
    };
  },

  getLinkRegexes() {
    return CSS_IMPORT;
  },
};
