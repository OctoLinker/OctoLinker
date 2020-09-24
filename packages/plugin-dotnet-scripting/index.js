import {
  FAKE_NUGET,
  NET_SCRIPT_FILE,
  NET_SCRIPT_NUGET,
} from '@octolinker/helper-grammar-regex-collection';
import nugetResolver from '@octolinker/resolver-nuget';
import relativeFile from '@octolinker/resolver-relative-file';

export default {
  name: 'DotNetScripting',

  resolve(path, [target]) {
    // this reference doesn't resolve to anything
    if (target === './.fake/build.fsx/intellisense.fsx') {
      return [];
    }

    return [relativeFile({ path, target }), nugetResolver({ target })];
  },

  getPattern() {
    return {
      pathRegexes: [/\.(cs|fs)x$/, /\.cake$/],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return [FAKE_NUGET, NET_SCRIPT_FILE, NET_SCRIPT_NUGET];
  },
};
