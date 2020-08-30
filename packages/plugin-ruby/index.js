import { join } from 'path';
import {
  REQUIRE,
  REQUIRE_RELATIVE,
} from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';

export default {
  name: 'Ruby',

  resolve(path, [target], meta, regex) {
    const isPath = !!target.match(/\//);
    // https://github.com/github/pages-gem/blob/master/lib/github-pages/dependencies.rb

    const isRequireRelative = regex.toString() === REQUIRE_RELATIVE.toString();

    if (isRequireRelative) {
      let resolvedPath = path;
      const splitPath = path.split('/');
      const currentFile = splitPath[splitPath.length - 1];
      resolvedPath = resolvedPath.replace(currentFile, `${target}.rb`);
      return `{BASE_URL}${resolvedPath}`;
    }

    if (isPath) {
      let splitPath = path.split('/lib/');
      if (splitPath.length < 2) {
        splitPath = path.split('/test/');
      }
      const basePath = join(splitPath[0], 'lib');
      return `{BASE_URL}${join(basePath, `${target}.rb`)}`;
    }

    return liveResolverQuery({ type: 'rubygems', target });
  },

  getPattern() {
    return {
      pathRegexes: [/\.rb$/],
      githubClasses: ['type-ruby', 'highlight-source-ruby'],
    };
  },

  getLinkRegexes() {
    return [REQUIRE, REQUIRE_RELATIVE];
  },
};
