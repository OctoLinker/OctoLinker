import XRegExp from 'xregexp';
import go from './go.js';

// The regular expressions in this file are built using XRegExp (http://xregexp.com/)
//
// Note that they are spread across multiple lines and that whitespace is irrelevant,
// so spaces have to be matched with \\s.
// http://xregexp.com/flags/#extended
//
// Also, groups are not captured by default, so only named groups work, like (?<name>pattern)
// http://xregexp.com/flags/#explicitCapture

const subpatterns = {
  captureQuotedDep: new XRegExp(`['"](?<dep>[^'"\\s]+)['"]`), // eslint-disable-line quotes
  importMembers: /[\r\n\s\w{},*\$]*/,
};

const REQUIRE = XRegExp.build(`(?nx)
  require(\\.resolve)?
  ( \\s | \\( ) \\s*
  {{captureQuotedDep}}
  \\s* \\)?
  `, subpatterns, 'g');

const IMPORT = XRegExp.build(`(?nx)
  import \\s {{importMembers}}
  ( \\s from \\s )?
  {{captureQuotedDep}}
  `, subpatterns, 'g');

const EXPORT = XRegExp.build(`(?nx)
  export \\s {{importMembers}}
  ( \\s from \\s )
  {{captureQuotedDep}}
  `, subpatterns, 'g');

const GEM = XRegExp.build(`(?nx)
  gem \\s {{captureQuotedDep}}
  `, subpatterns, 'g');

const HOMEBREW = XRegExp.build(`(?nx)
  (depends_on|conflicts_with)
  ( \\s cask: | \\s formula: )?
  \\s
  {{captureQuotedDep}}
  `, subpatterns, 'g');

const TYPESCRIPT_REFERENCE = XRegExp.build(`(?nx)
  \\/{3} \\s?
  <reference \\s path={{captureQuotedDep}}
  `, subpatterns, 'g');

const DOCKER_FROM = XRegExp.build(`(?nx)
  FROM \\s (?<dep>[^\\n]*)
  `, subpatterns, 'g');

const VIM_PLUGIN = XRegExp.build(`(?nx)
  (
    (
      (Neo)?
      Bundle
      (Lazy|Fetch)?
    )
    |
    Plug(in)?
  ) \\s
  {{captureQuotedDep}}
  `, subpatterns, 'g');

const RUST_CRATE = XRegExp.build(`(?nx)
  (extern \\s crate | use)
  \\s
  (?<dep>[^:;\\s]+)
  `, subpatterns, 'g');

const PYTHON_IMPORT = XRegExp.build(`(?nx)
  ^\\s*
  (import|from)
  \\s
  (?<dep>[^\\s]*)
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
