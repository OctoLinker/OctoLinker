import { RUST_CRATE } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';

export default {
  name: 'Rust',

  resolve(path, [target]) {
    return liveResolverQuery({ type: 'crates', target });
  },

  getPattern() {
    return {
      pathRegexes: [/\.rs$/],
      githubClasses: ['type-rust', 'highlight-source-rust'],
    };
  },

  getLinkRegexes() {
    return RUST_CRATE;
  },
};
