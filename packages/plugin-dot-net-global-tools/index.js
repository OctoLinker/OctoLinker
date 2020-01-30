import insertLink from '@octolinker/helper-insert-link';
import processJSON from '@octolinker/helper-process-json';
import { jsonRegExKeyValue } from '@octolinker/helper-regex-builder';
import nugetResolver from '@octolinker/resolver-nuget';

function linkDependency(blob, key, value) {
  const regex = jsonRegExKeyValue(key, value, true);
  return insertLink(blob, regex, this);
}

export default {
  name: 'DotNetCoreGlobalTools',
  needsContext: true,

  resolve(path, [target]) {
    return nugetResolver({ target });
  },

  getPattern() {
    return {
      pathRegexes: [/dotnet-tools\.json$/],
      githubClasses: [],
    };
  },

  parseBlob(blob) {
    return processJSON(blob, this, {
      '$.tools': linkDependency,
    });
  },
};
