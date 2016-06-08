export default function ({ type, target }) {
  let repoTarget;

  if (type == 'npm') {
    // If the target looks like 'foo/bar.js', pretend it is 'foo' instead. See
    // https://github.com/OctoLinker/browser-extension/issues/93
    repoTarget = target.split('/')[0];
  } else {
    repoTarget = target;
  }

  return {
    url: `https://githublinker.herokuapp.com/q/${type}/${repoTarget}`,
    method: 'GET',
  };
}
