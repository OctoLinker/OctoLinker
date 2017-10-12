import { RUST_CRATE } from '../../packages/helper-grammar-regex-collection/index.js';
import liveResolverQuery from '../resolver/live-resolver-query.js';

export default {
  name: 'Rust',

  resolve({ target }) {
    return liveResolverQuery({ type: 'crates', target });
  },

  getPattern() {
    return {
      pathPatterns: ['.rs$'],
      githubClasses: ['type-rust', 'highlight-source-rust'],
    };
  },

  getLinkRegexes() {
    return RUST_CRATE;
  },
};
