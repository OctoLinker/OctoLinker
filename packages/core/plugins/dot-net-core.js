import insertLink from '@octolinker/helper-insert-link';
import processJSON from './helper/process-json';
import { jsonRegExKeyValue } from './helper/regex-builder';
import nugetResolver from '../resolver/nuget';

function linkDependency(blob, key, value) {
  const regex = jsonRegExKeyValue(key, value);

  insertLink(blob.el, regex, {
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
    processJSON(blob, {
      '$.dependencies': linkDependency,
      '$.tools': linkDependency,
      '$.frameworks.*.dependencies': linkDependency,
    });
  },
};
