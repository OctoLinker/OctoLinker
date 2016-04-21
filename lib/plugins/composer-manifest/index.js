import processJSON from '../helper/process-json';
import { jsonRegExKeyValue } from '../helper/regex-builder';
import insertLink from '../../insert-link';

function linkDependency(blob, key, value) {
  if (key === 'php') {
    return;
  }

  const regex = jsonRegExKeyValue(key, value);

  insertLink(blob.el, regex, {
    resolver: 'resolverAPI',
    target: '$1',
    type: 'composer',
  });
}

export default class ComposerManifest {

  getPattern() {
    return ['composer.json'];
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
