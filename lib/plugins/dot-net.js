import nugetResolver from '../resolver/nuget';
import { NET_PACKAGE } from '../../packages/helper-grammar-regex-collection/index.js';

export default {
  name: 'DotNet',

  resolve({ target }) {
    return nugetResolver({ target });
  },

  getPattern() {
    return {
      pathPatterns: ['/packages.config$'],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return NET_PACKAGE;
  },
};
