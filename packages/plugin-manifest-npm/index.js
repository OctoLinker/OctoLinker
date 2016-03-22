import replaceKeywords from '../helper-replace-keywords';
import { registerHandler } from '../helper-click-handler';
import javaScriptClickHandler from '../grammar-javascript';
import escapeRegexString from 'escape-regex-string';

function linker(blob, result) {
  const [key, value] = result;
  const regexKey = escapeRegexString(key);
  const regexValue = escapeRegexString(value);
  const regex = new RegExp(`("${regexKey}")\\s*:\\s*"${regexValue}"`);

  replaceKeywords(blob.el, regex, {
    value: key,
    version: value,
    type: blob.type,
    path: blob.path,
  });
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

    linker(blob, [
      'main', json.main,
    ]);

    getDependencyList(json).forEach(linker.bind(null, blob));
  }
}
