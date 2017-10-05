import JavaScript from './javascript';
import { TYPESCRIPT_REFERENCE } from '../../packages/helper-grammar-regex-collection/index.js';

export default {
  name: 'TypeScript',

  resolve: JavaScript.resolve,

  getPattern() {
    return {
      pathPatterns: ['.ts$'],
      githubClasses: ['type-typescript', 'highlight-source-ts'],
    };
  },

  getLinkRegexes(blob) {
    return JavaScript.getLinkRegexes(blob).concat(TYPESCRIPT_REFERENCE);
  },
};
