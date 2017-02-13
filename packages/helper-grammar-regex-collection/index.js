import XRegExp from 'xregexp';
import go from './go.js';

const subpatterns = {
  captureQuotedDep: /['"]([^'"\s]+)['"]/,
  importMembers: /[\r\n\s\w{},*\$]*/,
};

const REQUIRE = XRegExp.build(`require(?:\\.resolve)?(?:\\s|\\()\\s*{{captureQuotedDep}}\\s*\\)?`, subpatterns, 'xg');
const IMPORT = XRegExp.build(`import\\s{{importMembers}}(?:\\sfrom\\s)?{{captureQuotedDep}}`, subpatterns, 'xg');
const EXPORT = XRegExp.build(`export\\s{{importMembers}}(?:\\sfrom\\s){{captureQuotedDep}}`, subpatterns, 'xg');
const GEM = XRegExp.build(`gem\\s{{captureQuotedDep}}`, subpatterns, 'xg');
const HOMEBREW = XRegExp.build(`(?:depends_on|conflicts_with)(?:\\scask:|\\sformula:)?\\s{{captureQuotedDep}}`, subpatterns, 'xg');
const TYPESCRIPT_REFERENCE = XRegExp.build(`\\/{3}\\s?<reference\\spath={{captureQuotedDep}}`, subpatterns, 'xg');
const DOCKER_FROM = XRegExp.build(`FROM\\s([^\\n]*)`, subpatterns, 'xg');
const VIM_PLUGIN = XRegExp.build(`(?:(?:(?:Neo)?Bundle(?:Lazy|Fetch)?)|Plug(?:in)?)\\s{{captureQuotedDep}}`, subpatterns, 'xg');
const RUST_CRATE = XRegExp.build(`(?:extern\\scrate|use)\\s([^:;\\s]+)`, subpatterns, 'xg');
const PYTHON_IMPORT = XRegExp.build(`^\\s*(?:import|from)\\s([^\\s]*)`, subpatterns, 'xgm');

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
