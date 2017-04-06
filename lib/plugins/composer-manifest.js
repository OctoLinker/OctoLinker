import processJSON from './helper/process-json';
import { jsonRegExKeyValue } from './helper/regex-builder';
import insertLink from '../insert-link';
import liveResolverQuery from '../resolver/live-resolver-query.js';

function linkDependency(blob, key, value) {
  if (key === 'php') {
    return;
  }

  const regex = jsonRegExKeyValue(key, value);

  insertLink(blob.el, regex, {
    pluginName: 'Composer',
    target: '$1',
  });
}

export default class Composer {

  static resolve({ target }) {
    return liveResolverQuery({ type: 'composer', target });
  }

  static getPattern() {
    return {
      pathPatterns: ['/composer.json$'],
      githubClasses: [],
    };
  }

  parseBlob(blob) {
    processJSON(blob, {
      '$.require': linkDependency,
      '$.require-dev': linkDependency,
      '$.conflict': linkDependency,
      '$.replace': linkDependency,
      '$.provide': linkDependency,
      '$.suggest': linkDependency,
    });
  }
}
