import { RUST_CRATE } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import liveResolverQuery from '../resolver/live-resolver-query.js';

export default class Rust {

  static resolve({ target }) {
    return liveResolverQuery({ type: 'crates', target });
  }

  static getPattern() {
    return {
      pathPatterns: ['.rs$'],
      githubClasses: [
        'type-rust',
        'highlight-source-rust',
      ],
    };
  }

  parseBlob(blob) {
    insertLink(blob.el, RUST_CRATE, {
      pluginName: this.constructor.name,
      target: '$1',
    });
  }
}
