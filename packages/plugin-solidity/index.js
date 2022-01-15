import { IMPORT } from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '@octolinker/resolver-relative-file';
import liveResolverQuery from '@octolinker/resolver-live-query';

function getTopModuleName(target) {
  const isScoped = target.startsWith('@');
  const numComponents = isScoped ? 2 : 1;
  const topModuleName = target.split('/').slice(0, numComponents).join('/');
  return topModuleName;
}

export default {
  name: 'Solidity',

  resolve(path, [target]) {
    let result;
    if (target.match(/^\.\.?[\\|\/]?/) !== null) {
      result = relativeFile({ path, target });
    } else {
      result = liveResolverQuery({
        type: 'npm',
        target: getTopModuleName(target),
      });
    }
    return result;
  },

  getPattern() {
    return {
      pathRegexes: [/\.sol$/],
      githubClasses: ['type-solidity', 'highlight-source-solidity'],
    };
  },

  getLinkRegexes() {
    return IMPORT;
  },
};
