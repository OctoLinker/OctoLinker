import { TYPESCRIPT_REFERENCE } from '@octolinker/helper-grammar-regex-collection';
import JavaScript from '@octolinker/plugin-javascript';

export default {
  name: 'TypeScript',

  resolve: JavaScript.resolve,

  getPattern() {
    return {
      pathRegexes: [/\.tsx?$/],
      githubClasses: ['type-typescript', 'highlight-source-ts'],
    };
  },

  getLinkRegexes(blob) {
    return JavaScript.getLinkRegexes(blob).concat(TYPESCRIPT_REFERENCE);
  },
};
