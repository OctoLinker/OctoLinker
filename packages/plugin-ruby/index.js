import { join } from 'path';
import { REQUIRE } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';

export default {
  name: 'Ruby',

  resolve(path, [target]) {
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
      pathRegexes: [/\.rb$/],
      githubClasses: ['type-ruby', 'highlight-source-ruby'],
    };
  },

  getLinkRegexes() {
    return REQUIRE;
  },
};
