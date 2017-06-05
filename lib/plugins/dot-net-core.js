import processJSON from './helper/process-json';
import { jsonRegExKeyValue } from './helper/regex-builder';
import insertLink from '../insert-link';

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
    return [
      `https://www.nuget.org/packages/${target}`,
    ];
  },

  getPattern() {
    return {
      pathPatterns: ['/project.json$'],
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
