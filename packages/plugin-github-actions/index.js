import { join } from 'path';
import { GITHUB_ACTIONS } from '@octolinker/helper-grammar-regex-collection';
import { dockerUrl } from '@octolinker/plugin-docker';

const DOCKER_SOURCE = 'docker://';

export default {
  name: 'GitHubActions',

  resolve(path, [target]) {
    if (!path.includes('.github/workflows')) {
      return '';
    }

    if (target.startsWith(DOCKER_SOURCE)) {
      const image = target.substring(DOCKER_SOURCE.length);

      return dockerUrl(image);
    }

    if (target.startsWith('.')) {
      const [, org, repo, , sha] = path.split('/');

      return `{BASE_URL}/${join(org, repo, 'tree', sha, target)}`;
    }

    const [org, repo, ...folder] = target.split('/');

    if (folder.length) {
      return [
        `{BASE_URL}/${join(org, repo, 'tree', 'main', ...folder)}`,
        `{BASE_URL}/${join(org, repo, 'tree', 'master', ...folder)}`,
      ];
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
