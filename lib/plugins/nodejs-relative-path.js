import { join, dirname } from 'path';
import { NODEJS_RELATIVE_PATH, NODEJS_RELATIVE_PATH_JOIN } from '../../packages/helper-grammar-regex-collection/index.js';

export default {
  name: 'NodejsRelativePath',

  resolve({ target, path }) {
    return `{BASE_URL}${join(dirname(path), target)}`;
  },

  getPattern() {
    return {
      pathPatterns: [
        '.js$',
        '.jsx$',
        '.es6$',
        // CoffeeScript
        '.coffee$',
        // TypeScript
        '.ts$',
      ],
      githubClasses: [
        'type-javascript',
        'type-jsx',
        'highlight-source-js',
        // CoffeeScript
        'type-coffeescript',
        'highlight-source-coffee',
        // TypeScript
        'type-typescript',
        'highlight-source-ts',
      ],
    };
  },

  getLinkRegexes() {
    return [NODEJS_RELATIVE_PATH, NODEJS_RELATIVE_PATH_JOIN];
  },
};
