import nugetResolver from '../resolver/nuget';
import {
  NET_PACKAGE,
  NET_PROJ_PACKAGE,
} from '../../packages/helper-grammar-regex-collection/index.js';

export default {
  name: 'DotNet',

  resolve({ target }) {
    return nugetResolver({ target });
  },

  getPattern() {
    return {
      pathRegexes: [/packages\.config$/, /\.(cs|fs|vb)proj$/, /\.props$/],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return [NET_PACKAGE, NET_PROJ_PACKAGE];
  },
};
