import { GEM } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import liveResolverQuery from '../resolver/live-resolver-query.js';

export default class Rubygems {

  static resolve({ target }) {
    return liveResolverQuery({
      target: target.split('.')[0],
      type: 'rubygems',
    });
  }

  static getPattern() {
    return {
      pathPatterns: ['/Gemfile$'],
      githubClasses: [],
    };
  }

  parseBlob(blob) {
    insertLink(blob.el, GEM, {
      pluginName: this.constructor.name,
      target: '$1',
    });
  }
}
