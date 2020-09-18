import { PAKET_REFERENCES } from '@octolinker/helper-grammar-regex-collection';
import nugetResolver from '@octolinker/resolver-nuget';

export default {
  name: 'DotNetPaketReferences',

  resolve(_path, [target]) {
    return nugetResolver({ target });
  },

  getPattern() {
    return {
      pathRegexes: [/paket\.references$/],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return [PAKET_REFERENCES];
  },
};
