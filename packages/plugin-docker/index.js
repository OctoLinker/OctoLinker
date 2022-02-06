import {
  DOCKER_FROM,
  DOCKER_ENTRYPOINT,
} from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '@octolinker/resolver-relative-file';
import resolverTrustedUrl from '@octolinker/resolver-trusted-url';

function isURL(str) {
  // RegExp origin https://stackoverflow.com/a/3809435/2121324
  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const urlRegex = new RegExp(expression);

  return urlRegex.test(str);
}

export function dockerUrl(target) {
  let isOfficial = true;
  const imageName = target.split(':')[0];

  if (isURL(`https://${imageName}`)) {
    return resolverTrustedUrl({ target: `https://${imageName}` });
  }

  if (target.includes('/')) {
    isOfficial = false;
  }

  return resolverTrustedUrl({
    target: `https://hub.docker.com/${isOfficial ? '_' : 'r'}/${imageName}`,
  });
}

export default {
  name: 'Docker',

  resolve(path, [target], meta, regex) {
    if (regex === DOCKER_ENTRYPOINT) {
      return relativeFile({ path, target });
    }

    return dockerUrl(target);
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
