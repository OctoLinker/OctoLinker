import { go } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';
import relativeFile from '@octolinker/resolver-relative-file';

function goFile({ path, target }) {
  const list = [];
  const basePath = relativeFile({ path, target });
  const filename = target.slice(target.lastIndexOf('/') + 1);

  list.push(`/${filename}.go`);
  list.push('.go');
  list.push('');

  return list.map((file) => `${basePath}${file}`);
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

  resolve(path, [target]) {
    const isPath = !!target.match(/^\.\.?[\\|\/]?/);

    if (isPath) {
      return goFile({ path, target });
    }

    if (target.startsWith('github.com')) {
      return githubUrls(target);
    }

    return [
      `https://${target}`,
      `https://pkg.go.dev/${target}`,
      liveResolverQuery({ type: 'go', target }),
    ];
  },

  getPattern() {
    return {
      pathRegexes: [/\.go$/, /go\.mod$/],
      githubClasses: ['type-go', 'highlight-source-go'],
    };
  },

  getLinkRegexes(blob) {
    return go(blob.toString());
  },
};
