import { LESS_IMPORT } from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '../resolver/relative-file.js';
import githubSearch from '../resolver/github-search.js';

export default {
  name: 'Less',

  resolve({ path, target }) {
    return [relativeFile({ path, target }), githubSearch({ path, target })];
  },

  getPattern() {
    return {
      pathRegexes: [/\.less$/],
      githubClasses: ['type-less', 'highlight-source-css-less'],
    };
  },

  getLinkRegexes() {
    return LESS_IMPORT;
  },
};
