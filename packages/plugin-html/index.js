import {
  HTML_IMPORT,
  HTML_SCRIPT_IMPORT,
} from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '@octolinker/resolver-relative-file';

export default {
  name: 'HTML',

  resolve(path, [target]) {
    return relativeFile({ path, target });
  },

  getPattern() {
    return {
      pathRegexes: [/\.html?$/],
      githubClasses: ['type-html'],
    };
  },

  getLinkRegexes() {
    return [HTML_IMPORT, HTML_SCRIPT_IMPORT];
  },
};
