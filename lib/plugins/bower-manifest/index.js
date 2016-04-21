import processJSON from '../helper/process-json';
import { isSemver } from '../helper/version';
import { jsonRegExKeyValue, jsonRegExValue } from '../helper/regex-builder';
import insertLink from '../../insert-link';

function linkDependency(type, blob, key, value) {
  const isValidSemver = isSemver(value);
  const regex = jsonRegExKeyValue(key, value);

  insertLink(blob.el, regex, {
    resolver: isValidSemver ? 'liveResolverQuery' : 'gitUrl | githubShorthand',
    target: isValidSemver ? '$1' : '$2',
    type: 'bower',
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

export default class BowerManifest {

  getPattern() {
    return ['bower.json'];
  }

  parseBlob(blob) {
    processJSON(blob, {
      '$.dependencies': linkDependency.bind(null, this.registryType),
      '$.devDependencies': linkDependency.bind(null, this.registryType),
      '$.resolutions': linkDependency.bind(null, this.registryType),
      '$.main': linkFile,
    });
  }
}
