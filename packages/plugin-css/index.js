import { CSS_IMPORT } from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '@octolinker/resolver-relative-file';

export default {
  name: 'CSS',

  resolve(path, [target]) {
    return relativeFile({ path, target });
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
