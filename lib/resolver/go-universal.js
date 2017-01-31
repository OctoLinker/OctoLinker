import goFile from './go-file.js';

function githubUrls(url) {
  const [, user, repo, ...path] = url.split('/');

  if (!path.length) {
    return [
      `{BASE_URL}/${user}/${repo}/blob/master/${repo}.go`,
      `{BASE_URL}/${user}/${repo}`,
    ];
  }

  const fullPath = path.join('/');
  const last = path.slice(-1);

  return [
    `{BASE_URL}/${user}/${repo}/blob/master/${fullPath}/${last}.go`,
    `{BASE_URL}/${user}/${repo}/tree/master/${fullPath}`,
    `{BASE_URL}/${user}/${repo}`,
  ];
}

export default function ({ target, path }) {
  const isPath = !!target.match(/^\.\.?[\\|\/]?/);

  if (isPath) {
    return goFile({ path, target });
  }

  if (target.startsWith('github.com')) {
    return githubUrls(target);
  }

  return [
    `https://${target}`,
    `https://golang.org/pkg/${target}`,
  ];
}
