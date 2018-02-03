import insertLink from '@octolinker/helper-insert-link';
import processJSON from '@octolinker/helper-process-json';
import { jsonRegExKeyValue } from '@octolinker/helper-regex-builder';
import nugetResolver from '@octolinker/resolver-nuget';

function linkDependency(blob, key, value) {
  const regex = jsonRegExKeyValue(key, value);

  return insertLink(blob.el, regex, {
    pluginName: 'DotNetCore',
    target: '$1',
  });
}

export default {
  name: 'DotNetCore',

  resolve({ target }) {
    return nugetResolver({ target });
  },

  getPattern() {
    return {
      pathRegexes: [/project\.json$/],
      githubClasses: [],
    };
  },

  parseBlob(blob) {
    return processJSON(blob, {
      '$.dependencies': linkDependency,
      '$.tools': linkDependency,
      '$.frameworks.*.dependencies': linkDependency,
    });
  },
};
