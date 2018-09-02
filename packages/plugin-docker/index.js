import {
  DOCKER_FROM,
  DOCKER_ENTRYPOINT,
} from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '@octolinker/resolver-relative-file';

export default {
  name: 'Docker',

  resolve(path, [target]) {
    let isOffical = true;
    const imageName = target.split(':')[0];

    if (target.includes('/')) {
      isOffical = false;
    }

    return [
      relativeFile({ path, target }),
      `https://hub.docker.com/${isOffical ? '_' : 'r'}/${imageName}`,
    ];
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
