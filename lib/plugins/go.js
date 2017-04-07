import { join, dirname } from 'path';
import { go } from '../../packages/helper-grammar-regex-collection/index.js';

function goFile({ path, target }) {
  const list = [];
  const basePath = join(dirname(path), target);
  const filename = target.slice(target.lastIndexOf('/') + 1);

  list.push(`/${filename}.go`);
  list.push('.go');
  list.push('');

  return list.map(file => `{BASE_URL}${basePath}${file}`);
}

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

export default {
  name: 'Go',

  resolve({ target, path }) {
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
  },

  getPattern() {
    return {
      pathPatterns: ['.go$'],
      githubClasses: [
        'type-go',
        'highlight-source-go',
      ],
    };
  },

  getLinkRegexes(blob) {
    return go(blob.toString());
  },
};
