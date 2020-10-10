import {R_LIBRARY, R_NAMESPACE} from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query'

export default {
  name: "r",

  resolve(path, [target]) {
    return liveResolverQuery({ target, type: 'cran'})
  },

  getPattern() {
    return {
      pathRegexes: [/\.R$/, /\.Rmd$/],
      githubClasses: ['type-r', 'highlight-source-r']
    };
  },

  getLinkRegexes() {
    return [R_LIBRARY, R_NAMESPACE];
  }
}