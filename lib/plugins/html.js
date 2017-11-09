import {
  HTML_IMPORT,
  HTML_SCRIPT_IMPORT,
} from '../../packages/helper-grammar-regex-collection/index.js';
import relativeFile from '../resolver/relative-file.js';

export default {
  name: 'HTML',

  resolve({ target, path }) {
    return [relativeFile({ path, target })];
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
