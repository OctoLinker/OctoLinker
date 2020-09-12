import {
  DOCKER_FROM,
  DOCKER_ENTRYPOINT,
} from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '@octolinker/resolver-relative-file';

export function dockerHubUrl(target) {
  let isOfficial = true;
  const imageName = target.split(':')[0];

  if (target.includes('/')) {
    isOfficial = false;
  }

  return `https://hub.docker.com/${isOfficial ? '_' : 'r'}/${imageName}`;
}

export default {
  name: 'Docker',

  resolve(path, [target]) {
    return [relativeFile({ path, target }), dockerHubUrl(target)];
  },

  getPattern() {
    return {
      pathRegexes: [/Dockerfile$/],
      githubClasses: ['type-dockerfile', 'highlight-source-dockerfile'],
    };
  },

  getLinkRegexes() {
    return [DOCKER_FROM, DOCKER_ENTRYPOINT];
  },
};
