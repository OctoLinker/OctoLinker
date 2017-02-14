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

const raw = String.raw;

const subpatterns = {
  captureQuotedDep: new XRegExp(raw`['"](?<$1>[^'"\s]+)['"]`),
  importMembers: /[\r\n\s\w{},*\$]*/,
};

const REQUIRE = XRegExp.build(raw`(?nx)
  require(\.resolve)?
  ( \s | \( ) \s*
  {{captureQuotedDep}}
  \s* \)?
  `, subpatterns, 'g');

const IMPORT = XRegExp.build(raw`(?nx)
  import \s {{importMembers}}
  ( \s from \s )?
  {{captureQuotedDep}}
  `, subpatterns, 'g');

const EXPORT = XRegExp.build(raw`(?nx)
  export \s {{importMembers}}
  ( \s from \s )
  {{captureQuotedDep}}
  `, subpatterns, 'g');

const GEM = XRegExp.build(raw`(?nx)
  gem \s {{captureQuotedDep}}
  `, subpatterns, 'g');

const HOMEBREW = XRegExp.build(raw`(?nx)
  (depends_on|conflicts_with)
  ( \s cask: | \s formula: )?
  \s
  {{captureQuotedDep}}
  `, subpatterns, 'g');

const TYPESCRIPT_REFERENCE = XRegExp.build(raw`(?nx)
  \/{3} \s?
  <reference \s path={{captureQuotedDep}}
  `, subpatterns, 'g');

const DOCKER_FROM = XRegExp.build(raw`(?nx)
  FROM \s (?<$1>[^\n]*)
  `, subpatterns, 'g');

const VIM_PLUGIN = XRegExp.build(raw`(?nx)
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
  `, subpatterns, 'g');

const RUST_CRATE = XRegExp.build(raw`(?nx)
  (extern \s crate | use)
  \s
  (?<$1>[^:;\s]+)
  `, subpatterns, 'g');

const PYTHON_IMPORT = XRegExp.build(raw`(?nx)
  ^\s*
  (import|from)
  \s
  (?<$1>[^\s]*)
  `, subpatterns, 'gm');

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
