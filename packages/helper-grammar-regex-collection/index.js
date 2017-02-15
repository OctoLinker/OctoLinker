import XRegExp from 'xregexp';
import go from './go.js';

// The regular expressions in this file are built using XRegExp (http://xregexp.com/)
//
// Note that they are spread across multiple lines and that whitespace is irrelevant,
// so spaces have to be matched with \s.
// http://xregexp.com/flags/#extended
//
// Also, groups are not captured by default, so only named groups work, like (?<name>pattern)
// http://xregexp.com/flags/#explicitCapture

const subpatterns = {};

const regex = (pattern) => {
  const buildPattern = `(?x)${String.raw(pattern)}`;
  const flags = 'ngm';
  return XRegExp.build(buildPattern, subpatterns, flags);
};

subpatterns.captureQuotedDep = regex`
  ['"]            # beginning quote
  (?<$1>[^'"\s]+) # capture the word inside the quotes
  ['"]            # end quote
`;

subpatterns.importMembers = regex`[\r\n\s\w{},*\$]*`;
subpatterns.from = regex`( \s from \s )`;

const REQUIRE = regex`
  require(\.resolve)?
  ( \s | \( ) \s*
  {{captureQuotedDep}}
  \s* \)?
`;

const IMPORT = regex`
  import \s {{importMembers}}
  {{from}}?
  {{captureQuotedDep}}
`;

const EXPORT = regex`
  export \s {{importMembers}}
  {{from}}
  {{captureQuotedDep}}
`;

const GEM = regex`
  gem \s {{captureQuotedDep}}
`;

const HOMEBREW = regex`
  (depends_on|conflicts_with)
  ( \s cask: | \s formula: )?
  \s
  {{captureQuotedDep}}
`;

const TYPESCRIPT_REFERENCE = regex`
  \/{3} \s?
  <reference \s path={{captureQuotedDep}}
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
  {{captureQuotedDep}}
`;

const RUST_CRATE = regex`
  (extern \s crate | use)
  \s
  (?<$1>[^:;\s]+)
`;

const PYTHON_IMPORT = regex`
  ^\s*
  (import|from)
  \s
  (?<$1>[^\s]*)
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
  go,
};
