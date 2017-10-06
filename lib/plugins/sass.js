import { join } from 'path';
import pathParse from 'path-parse';
import { CSS_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';
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
      pathPatterns: ['.scss$', '.sass$'],
      githubClasses: ['type-sass', 'highlight-source-sass'],
    };
  },

  getLinkRegexes() {
    return CSS_IMPORT;
  },
};
