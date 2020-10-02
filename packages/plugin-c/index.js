import { C_INCLUDE } from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '@octolinker/resolver-relative-file';

export default {
  name: 'C',

  resolve(path, [target]) {
    const [, , , , , ...parts] = path.split('/');
    const urls = parts.map((_currentValue, index) =>
      relativeFile({ path, target: '../'.repeat(index) + target }),
    );
    return urls;
  },

  getPattern() {
    return {
      pathRegexes: [
        /\.c$/,
        /\.cc$/,
        /\.cpp$/,
        /\.cxx$/,
        /\.c%2B%2B.*$/, // .c++ needs to be url encoded to match
        /\.h$/,
        /\.hh$/,
        /\.hpp$/,
        /\.hxx$/,
        /\.h%2B%2B.*$/, // .h++ needs to be url encoded to match
      ],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return [C_INCLUDE];
  },
};
