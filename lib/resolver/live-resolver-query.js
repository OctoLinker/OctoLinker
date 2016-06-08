export default function ({ type, target }) {
  if (type == 'npm') {
    // If the target looks like 'foo/bar.js', pretend it is 'foo' instead. See
    // https://github.com/OctoLinker/browser-extension/issues/93
    target = target.split('/')[0];
  }
  return {
    url: `https://githublinker.herokuapp.com/q/${type}/${target}`,
    method: 'GET',
  };
}
