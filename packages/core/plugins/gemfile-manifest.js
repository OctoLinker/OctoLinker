import { GEM } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '../resolver/live-resolver-query.js';

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
