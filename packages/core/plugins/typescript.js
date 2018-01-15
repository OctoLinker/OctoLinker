import { TYPESCRIPT_REFERENCE } from '@octolinker/helper-grammar-regex-collection';
import JavaScript from './javascript';

export default {
  name: 'TypeScript',

  resolve: JavaScript.resolve,

  getPattern() {
    return {
      pathRegexes: [/\.ts$/],
      githubClasses: ['type-typescript', 'highlight-source-ts'],
    };
  },

  getLinkRegexes(blob) {
    return JavaScript.getLinkRegexes(blob).concat(TYPESCRIPT_REFERENCE);
  },
};
