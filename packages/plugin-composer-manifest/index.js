import insertLink from '@octolinker/helper-insert-link';
import processJSON from '@octolinker/helper-process-json';
import { jsonRegExKeyValue } from '@octolinker/helper-regex-builder';
import liveResolverQuery from '@octolinker/resolver-live-query';

function linkDependency(blob, key, value) {
  if (key === 'php') {
    return;
  }

  const regex = jsonRegExKeyValue(key, value);

  return insertLink(blob.el, regex, {
    pluginName: 'Composer',
    target: '$1',
  });
}

export default {
  name: 'Composer',

  resolve({ target }) {
    return liveResolverQuery({ type: 'composer', target });
  },

  getPattern() {
    return {
      pathRegexes: [/composer\.json$/],
      githubClasses: [],
    };
  },

  parseBlob(blob) {
    return processJSON(blob, {
      '$.require': linkDependency,
      '$.require-dev': linkDependency,
      '$.conflict': linkDependency,
      '$.replace': linkDependency,
      '$.provide': linkDependency,
      '$.suggest': linkDependency,
    });
  },
};
