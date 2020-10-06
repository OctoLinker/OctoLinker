import {
  PAKET_DEPENDENCIES_NUGET,
  PAKET_DEPENDENCIES_GITHUB,
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

  resolve(_path, [target, hash, filePath], _meta, regExp) {
    if (regExp === PAKET_DEPENDENCIES_GITHUB) {
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
    return [PAKET_DEPENDENCIES_NUGET, PAKET_DEPENDENCIES_GITHUB];
  },
};
