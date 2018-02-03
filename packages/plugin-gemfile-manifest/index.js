import { GEM } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';

export default {
  name: 'Rubygems',

  resolve({ target }) {
    return liveResolverQuery({
      target: target.split('.')[0],
      type: 'rubygems',
    });
  },

  getPattern() {
    return {
      pathRegexes: [/Gemfile$/],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return GEM;
  },
};
