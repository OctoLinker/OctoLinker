import {
  R_LIBRARY,
  R_NAMESPACE,
} from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';

export default {
  name: 'r',

  resolve(path, [target]) {
    return liveResolverQuery({ type: 'cran', target });
  },

  getPattern() {
    return {
      pathRegexes: [/\.R$/, /\.Rmd$/],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return [R_LIBRARY, R_NAMESPACE];
  },
};
