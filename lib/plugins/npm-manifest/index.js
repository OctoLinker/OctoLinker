import processJSON from '../helper/process-json';
import { isSemver } from '../helper/version';
import { jsonRegExKeyValue, jsonRegExValue } from '../helper/regex-builder';
import insertLink from '../../insert-link';

function linkDependency(blob, key, value) {
  const isValidSemver = isSemver(value);
  const regex = jsonRegExKeyValue(key, value);

  insertLink(blob.el, regex, {
    resolver: isValidSemver ? 'resolverAPI' : 'gitUrl | githubShorthand',
    target: isValidSemver ? '$1' : '$2',
    type: 'npm',
  });
}

function linkFile(blob, key, value) {
  const regex = jsonRegExValue(key, value);

  insertLink(blob.el, regex, {
    resolver: 'javascriptFile',
    path: blob.path,
    target: '$1',
  });
}

export default class NpmManifest {

  getPattern() {
    return ['package.json'];
  }

  parseBlob(blob) {
    processJSON(blob, {
      '$.dependencies': linkDependency,
      '$.devDependencies': linkDependency,
      '$.peerDependencies': linkDependency,
      '$.optionalDependencies': linkDependency,
      '$.main': linkFile,
    });
  }
}
