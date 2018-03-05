import { join, dirname } from 'path';
import {
  NODEJS_RELATIVE_PATH,
  NODEJS_RELATIVE_PATH_JOIN,
} from '@octolinker/helper-grammar-regex-collection';
import JavaScript from '@octolinker/plugin-javascript';
import TypeScript from '@octolinker/plugin-typescript';

export default {
  name: 'NodejsRelativePath',

  resolve(path, [target]) {
    return `{BASE_URL}${join(dirname(path), target)}`;
  },

  getPattern() {
    const jsRegexes = JavaScript.getPattern().pathRegexes;
    const tsRegexes = TypeScript.getPattern().pathRegexes;

    const jsClasses = JavaScript.getPattern().githubClasses;
    const tsClasses = TypeScript.getPattern().githubClasses;

    return {
      pathRegexes: jsRegexes.concat(tsRegexes),
      githubClasses: jsClasses.concat(tsClasses),
    };
  },

  getLinkRegexes() {
    return [NODEJS_RELATIVE_PATH, NODEJS_RELATIVE_PATH_JOIN];
  },
};
