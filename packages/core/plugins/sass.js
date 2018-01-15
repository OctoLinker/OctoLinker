import { join } from 'path';
import pathParse from 'path-parse';
import { CSS_IMPORT } from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '../resolver/relative-file.js';
import githubSearch from '../resolver/github-search.js';

export default {
  name: 'Sass',

  resolve({ path, target }) {
    const { dir, name } = pathParse(target);
    const prefixedTarget = join(dir, `_${name}`);

    return [
      relativeFile({ path, target: `${prefixedTarget}.scss` }),
      relativeFile({ path, target: `${prefixedTarget}.sass` }),
      githubSearch({ path, target: `${prefixedTarget}.scss` }),
      githubSearch({ path, target: `${prefixedTarget}.sass` }),
    ];
  },

  getPattern() {
    return {
      pathRegexes: [/\.s[c|a]ss$/],
      githubClasses: ['type-sass', 'highlight-source-sass'],
    };
  },

  getLinkRegexes() {
    return CSS_IMPORT;
  },
};
