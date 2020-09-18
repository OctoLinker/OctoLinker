import {
  PAKET_NUGET_DEPENDENCIES,
  PAKET_GITHUB_DEPENDENCIES,
} from '@octolinker/helper-grammar-regex-collection';
import nugetResolver from '@octolinker/resolver-nuget';

function githubPaths({ target, hash, filePath }) {
  const urls = [];

  if (filePath) {
    if (hash) {
      urls.push(`https://github.com/${target}/blob/${hash}/${filePath}`);
    }

    urls.push(`https://github.com/${target}/blob/master/${filePath}`);
  }

  if (hash) {
    urls.push(`https://github.com/${target}/tree/${hash}`);
  }

  urls.push(`https://github.com/${target}`);

  return urls;
}

export default {
  name: 'DotNetPaketDependencies',

  resolve(_path, [target, hash, filePath]) {
    if (target.includes('/')) {
      return githubPaths({ target, hash, filePath });
    }

    return nugetResolver({ target });
  },

  getPattern() {
    return {
      pathRegexes: [/paket\.dependencies$/, /paket\.local$/],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return [PAKET_NUGET_DEPENDENCIES, PAKET_GITHUB_DEPENDENCIES];
  },
};
