import processJSON from '../helper/process-json';
import { jsonRegExKeyValue } from '../helper/regex-builder';
import insertLink from '../../insert-link';

function linkDependency(blob, key, value) {
  const regex = jsonRegExKeyValue(key, value);

  insertLink(blob.el, regex, {
    resolver: 'nugetUrl',
    target: '$1',
  });
}

export default class ProjectJson {
  getPattern() {
    return ['project.json'];
  }

  parseBlob(blob) {
    processJSON(blob, {
      '$.dependencies': linkDependency,
      '$.tools': linkDependency,
    });
  }
}
