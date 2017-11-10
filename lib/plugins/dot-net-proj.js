import nugetResolver from '../resolver/nuget';
import { NET_PROJ_PACKAGE } from '../../packages/helper-grammar-regex-collection/index.js';

export default {
  name: 'DotNetProj',

  resolve({ target }) {
    return nugetResolver({ target });
  },

  getPattern() {
    return {
      pathRegexes: [/\.(cs|vb)proj$/],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return NET_PROJ_PACKAGE;
  },
};
