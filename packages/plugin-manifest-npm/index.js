import replaceKeywords from '../helper-replace-keywords';
import { registerHandler } from '../helper-click-handler';
import javaScriptClickHandler from '../grammar-javascript';
import escapeRegexString from 'escape-regex-string';

function regexBuilder(key, value) {
  const regexKey = escapeRegexString(key);
  const regexValue = escapeRegexString(value);
  return new RegExp(`("${regexKey}")\\s*:\\s*("${regexValue}")`);
}

function linker(blob, result) {
  const [key, value] = result;
  const regex = regexBuilder(key, value);

  replaceKeywords(blob.el, regex, {
    value: '$1',
    version: '$2',
    type: blob.type,
    path: blob.path,
  }, '$1');
}

function mainLinker(blob, result) {
  const [key, value] = result;
  const regex = regexBuilder(key, value);

  replaceKeywords(blob.el, regex, {
    value: '$2',
    type: blob.type,
    path: blob.path,
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
    registerHandler('JSON', this.clickHandler);
  }

  blobTypes() {
    return ['JSON'];
  }

  clickHandler(data) {
    const { value, path } = data;
    javaScriptClickHandler(value, path);
  }

  parseBlob(blob) {
    const json = blob.getJSON();

    mainLinker(blob, [
      'main', json.main,
    ]);

    getDependencyList(json).forEach((item) => {
      linker(blob, item, 0);
    });
  }
}
