import { join } from 'path';
import { REQUIRE } from '../../packages/helper-grammar-regex-collection/index.js';
import liveResolverQuery from '../resolver/live-resolver-query.js';

export default {
  name: 'Ruby',

  resolve({ target, path }) {
    const isPath = !!target.match(/\//);

    // https://github.com/github/pages-gem/blob/master/lib/github-pages/dependencies.rb

    if (isPath) {
      const basePath = join(path.split('/lib/')[0], 'lib');

      return `{BASE_URL}${join(basePath, `${target}.rb`)}`;
    }

    return [liveResolverQuery({ type: 'rubygems', target })];
  },

  getPattern() {
    return {
      pathPatterns: ['.rb$'],
      githubClasses: ['type-ruby', 'highlight-source-ruby'],
    };
  },

  getLinkRegexes() {
    return REQUIRE;
  },
};
