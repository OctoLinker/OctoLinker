import { LESS_IMPORT } from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '@octolinker/resolver-relative-file';
import githubSearch from '@octolinker/resolver-github-search';

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
