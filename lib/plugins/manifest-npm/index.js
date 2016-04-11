import semver from 'semver';
import escapeRegexString from 'escape-regex-string';
import wrapKeyword from '../../wrap-keyword';

function regexBuilder(key, value) {
  const regexKey = escapeRegexString(key);
  const regexValue = escapeRegexString(value);
  return new RegExp(`("${regexKey}")\\s*:\\s*("${regexValue}")`);
}

function isValidSemver(value) {
  return semver.valid(value) || semver.validRange(value);
}

function linker(blob, result) {
  const [key, value] = result;
  const regex = regexBuilder(key, value);

  const isSemver = isValidSemver(value);

  wrapKeyword(blob.el, regex, {
    resolver: isSemver ? 'resolverAPI' : 'gitUrl|githubShorthand',
    target: isSemver ? '$1' : '$2',
    type: 'npm',
  });
}

function mainLinker(blob, result) {
  const [key, value] = result;
  const regex = regexBuilder(key, value);

  wrapKeyword(blob.el, regex, {
    resolver: 'javascriptFile',
    path: blob.path,
    target: '$2',
  }, '$2');
}

function getDependencyList(json) {
  let result = [];

  [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
  ].forEach((node) => {
    if (json[node]) {
      result = result.concat(Object.entries(json[node]));
    }
  });

  return result;
}

export default class NPMmanifest {

  initialize() {
  }

  blobTypes() {
    return ['JSON'];
  }

  parseBlob(blob) {
    const json = blob.getJSON();

    if (json.main) {
      mainLinker(blob, [
        'main', json.main,
      ]);
    }

    getDependencyList(json).forEach((item) => {
      linker(blob, item, 0);
    });
  }
}
