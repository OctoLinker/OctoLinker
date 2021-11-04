import { SOLIDITY_IMPORT } from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '@octolinker/resolver-relative-file';

export default {
  name: 'Solidity',

  resolve(path, [target]) {
    return relativeFile({ path, target });
  },

  getPattern() {
    return {
      pathRegexes: [/\.sol$/],
      githubClasses: ['type-solidity', 'highlight-source-solidity'],
    };
  },

  getLinkRegexes() {
    return SOLIDITY_IMPORT;
  },
};
