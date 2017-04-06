import { join } from 'path';
import { REQUIRE } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import liveResolverQuery from '../resolver/live-resolver-query.js';

export default class Ruby {

  static resolve({ target, path }) {
    const isPath = !!target.match(/\//);

    // https://github.com/github/pages-gem/blob/master/lib/github-pages/dependencies.rb

    if (isPath) {
      const basePath = join(path.split('/lib/')[0], 'lib');

      return `{BASE_URL}${join(basePath, `${target}.rb`)}`;
    }

    return [
      liveResolverQuery({ type: 'rubygems', target }),
    ];
  }

  static getPattern() {
    return {
      pathPatterns: ['.rb$'],
      githubClasses: [
        'type-ruby',
        'highlight-source-ruby',
      ],
    };
  }

  parseBlob(blob) {
    insertLink(blob.el, REQUIRE, {
      pluginName: this.constructor.name,
      target: '$1',
      path: blob.path,
    });
  }
}
