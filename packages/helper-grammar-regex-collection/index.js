import XRegExp from 'xregexp';
import go from './go.js';

const subpatterns = {
  captureQuotedDep: /['"]([^'"\s]+)['"]/,
  importMembers: /[\r\n\s\w{},*\$]*/,
};

const REQUIRE = XRegExp.build(`(?x)
  require(?:\\.resolve)?
  (?:\\s|\\()\\s*
  {{captureQuotedDep}}
  \\s*\\)?
  `, subpatterns, 'g');

const IMPORT = XRegExp.build(`(?x)
  import\\s{{importMembers}}
  (?:\\sfrom\\s)?
  {{captureQuotedDep}}
  `, subpatterns, 'g');

const EXPORT = XRegExp.build(`(?x)
  export\\s{{importMembers}}
  (?:\\sfrom\\s)
  {{captureQuotedDep}}
  `, subpatterns, 'g');

const GEM = XRegExp.build(`(?x)
  gem\\s{{captureQuotedDep}}
  `, subpatterns, 'g');

const HOMEBREW = XRegExp.build(`(?x)
  (?:depends_on|conflicts_with)
  (?:\\scask:|\\sformula:)?
  \\s
  {{captureQuotedDep}}
  `, subpatterns, 'g');

const TYPESCRIPT_REFERENCE = XRegExp.build(`(?x)
  \\/{3}\\s?
  <reference\\spath={{captureQuotedDep}}
  `, subpatterns, 'g');

const DOCKER_FROM = XRegExp.build(`(?x)
  FROM\\s([^\\n]*)
  `, subpatterns, 'g');

const VIM_PLUGIN = XRegExp.build(`(?x)
  (?:
    (?:
      (?:Neo)?
      Bundle
      (?:Lazy|Fetch)?
    )
    |Plug(?:in)?
  )\\s
  {{captureQuotedDep}}
  `, subpatterns, 'g');

const RUST_CRATE = XRegExp.build(`(?x)
  (?:extern\\scrate|use)
  \\s
  ([^:;\\s]+)
  `, subpatterns, 'g');

const PYTHON_IMPORT = XRegExp.build(`(?x)
  ^\\s*
  (?:import|from)
  \\s
  ([^\\s]*)
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
