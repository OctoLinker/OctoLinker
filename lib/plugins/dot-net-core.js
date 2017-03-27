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

export default class DotNetCore {

  static resolve({ target }) {
    return [
      `https://www.nuget.org/packages/${target}`,
    ];
  }

  getPattern() {
    return ['/project.json$'];
  }

  parseBlob(blob) {
    processJSON(blob, {
      '$.dependencies': linkDependency,
      '$.tools': linkDependency,
    });
  }
}
