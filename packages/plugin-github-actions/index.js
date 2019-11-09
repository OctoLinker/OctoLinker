import { GITHUB_ACTIONS } from '@octolinker/helper-grammar-regex-collection';

export default {
  name: 'GitHubActions',

  resolve(path, [target]) {
    if (!path.includes('.github/workflows')) {
      return '';
    }

    return `{BASE_URL}/${target}`;
  },

  getPattern() {
    return {
      pathRegexes: [/\.ya?ml$/],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return GITHUB_ACTIONS;
  },
};
