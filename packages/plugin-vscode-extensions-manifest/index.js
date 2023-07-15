import insertLink from '@octolinker/helper-insert-link';
import processJSON from '@octolinker/helper-process-json';
import resolverTrustedUrl from '@octolinker/resolver-trusted-url';
import { jsonRegExArrayValue } from '@octolinker/helper-regex-builder';

function linkDependency(blob, _key, value) {
  const regex = jsonRegExArrayValue(value);

  return insertLink(blob, regex, this);
}

export default {
  name: 'VSCodeExtensionsManifest',
  needsContext: true,

  resolve(_path, [target]) {
    return resolverTrustedUrl({
      target: `https://marketplace.visualstudio.com/items?itemName=${target}`,
    });
  },

  getPattern() {
    return {
      pathRegexes: [
        /\.devcontainer\/devcontainer\.json$/,
        /\.vscode\/extensions\.json$/,
      ],
      githubClasses: [],
    };
  },

  parseBlob(blob) {
    return processJSON(
      blob,
      this,
      blob.path.endsWith('devcontainer.json')
        ? {
            '$.extensions': linkDependency,
            '$.customizations.vscode.extensions': linkDependency,
          }
        : {
            '$.recommendations': linkDependency,
            '$.unwantedRecommendations': linkDependency,
          },
    );
  },
};
