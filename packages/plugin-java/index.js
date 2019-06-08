import { JAVA_IMPORT } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';

export default {
  name: 'Java',

  resolve(path, [target]) {
    return liveResolverQuery({ type: 'java', target });
  },

  getPattern() {
    return {
      pathRegexes: [/\.java$/],
      githubClasses: ['type-java', 'highlight-source-java'],
    };
  },

  getLinkRegexes() {
    return JAVA_IMPORT;
  },
};
