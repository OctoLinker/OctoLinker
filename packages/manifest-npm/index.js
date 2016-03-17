import replaceKeywords from '../helper-replace-keywords';

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

export default {
  blobTypes: ['JSON'],
  run: (blob) => {
    const json = blob.getJSON();

    [
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',
    ].forEach(replaceDep.bind(null, json, blob));
  },
};
