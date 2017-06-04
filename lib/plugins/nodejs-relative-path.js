import { join, dirname } from 'path';
import { NODEJS_RELATIVE_PATH, NODEJS_RELATIVE_PATH_JOIN } from '../../packages/helper-grammar-regex-collection/index.js';
import JavaScript from './javascript';
import TypeScript from './typescript';

export default {
  name: 'NodejsRelativePath',

  resolve({ target, path }) {
    return `{BASE_URL}${join(dirname(path), target)}`;
  },

  getPattern() {
    const jsPatterns = JavaScript.getPattern().pathPatterns;
    const tsPatterns = TypeScript.getPattern().pathPatterns;

    const jsClasses = JavaScript.getPattern().githubClasses;
    const tsClasses = TypeScript.getPattern().githubClasses;

    return {
      pathPatterns: jsPatterns.concat(tsPatterns),
      githubClasses: jsClasses.concat(tsClasses),
    };
  },

  getLinkRegexes() {
    return [NODEJS_RELATIVE_PATH, NODEJS_RELATIVE_PATH_JOIN];
  },
};
