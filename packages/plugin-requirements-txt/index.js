import { REQUIREMENTS_TXT } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';

export default {
  name: 'RequirementsTxt',

  resolve({ target }) {
    return [
      liveResolverQuery({
        target,
        type: 'pypi',
      }),
    ];
  },

  getPattern() {
    return {
      pathRegexes: [/requirements\.txt$/],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return REQUIREMENTS_TXT;
  },
};
