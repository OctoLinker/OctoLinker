import replaceKeywords from '../helper-replace-keywords';
import { registerHandler } from '../helper-click-handler';
import javaScriptClickHandler from '../grammar-javascript';

function replaceDep(json, blob, node) {
  Object.entries(json[node] || {}).forEach((item) => {
    const [key, value] = item;

    const regex = new RegExp(`(?:${node})(?:.|\n+?)+("${key}").+`);
    replaceKeywords(blob.el, regex, {
      value: key,
      version: value,
      type: blob.type,
      path: blob.path,
    });
  });
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

    [
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',
    ].forEach(replaceDep.bind(null, json, blob));
  }
}
