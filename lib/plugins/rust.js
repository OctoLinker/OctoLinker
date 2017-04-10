import { RUST_CRATE } from '../../packages/helper-grammar-regex-collection/index.js';
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

  static getLinkRegexes() {
    return RUST_CRATE;
  }
}
