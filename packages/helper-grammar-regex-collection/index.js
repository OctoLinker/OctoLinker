import go from './go.js';
import regex from './regex';

const captureQuotedWord = regex`
  ['"]            # beginning quote
  (?<$1>[^'"\s]+) # capture the word inside the quotes
  ['"]            # end quote
`;

const importMembers = regex`[\r\n\s\w{},*\$]*`;
const from = regex`\s from \s`;

const REQUIRE = regex`
  require(\.resolve)?
  ( \s | \( ) \s*
  ${captureQuotedWord}
`;

const IMPORT = regex`
  import \s ${importMembers}
  ${from}?
  ${captureQuotedWord}
`;

const EXPORT = regex`
  export \s ${importMembers}
  ${from}
  ${captureQuotedWord}
`;

const GEM = regex`
  gem \s ${captureQuotedWord}
`;

const HOMEBREW = regex`
  (depends_on|conflicts_with)
  ( \s cask: | \s formula: )?
  \s
  ${captureQuotedWord}
`;

const TYPESCRIPT_REFERENCE = regex`
  \/{3} \s?
  <reference \s path=${captureQuotedWord}
`;

const DOCKER_FROM = regex`
  FROM \s (?<$1>[^\n]*)
`;

const VIM_PLUGIN = regex`
  (
    (
      (Neo)?
      Bundle
      (Lazy|Fetch)?
    )
    |
    Plug(in)?
  ) \s
  ${captureQuotedWord}
`;

const RUST_CRATE = regex`
  \b (extern \s crate | use)
  \s
  (?<$1>[^:;\s]+)
`;

const PYTHON_IMPORT = regex`
  ^\s*
  (import|from)
  \s
  (?<$1>[^\s]*)
`;

const HASKELL_IMPORT = regex`
  ((^|\s)import\s+(qualified\s)?)
  (?<$1> [A-Z][\w.]+)
`;

const CSS_IMPORT = regex`
  ^\s*
  @import
  \s
  ((url|URL)\()?
  ${captureQuotedWord}
`;

const HTML_IMPORT = regex`
  ^\s*
  <link
  \s
  rel="import"
  \s
  href=${captureQuotedWord}>
`;

export {
  REQUIRE,
  IMPORT,
  EXPORT,
  GEM,
  HOMEBREW,
  TYPESCRIPT_REFERENCE,
  DOCKER_FROM,
  VIM_PLUGIN,
  RUST_CRATE,
  PYTHON_IMPORT,
  CSS_IMPORT,
  HTML_IMPORT,
  go,
  HASKELL_IMPORT,
};
