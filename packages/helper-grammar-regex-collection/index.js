import XRegExp from 'xregexp';
import go from './go.js';

const subpatterns = {
  captureQuotedDep: /['"]([^'"\s]+)['"]/,
};

const REQUIRE = XRegExp.build(`require(?:\\.resolve)?(?:\\s|\\()\\s*{{captureQuotedDep}}\\s*\\)?`, subpatterns, 'g');
const IMPORT = XRegExp.build(`import [\\r\\n\\s\\w{},*\\$]*(?: from )?{{captureQuotedDep}}`, subpatterns, 'g');
const EXPORT = XRegExp.build(`export [\\r\\n\\s\\w{},*\\$]*(?: from ){{captureQuotedDep}}`, subpatterns, 'g');
const GEM = XRegExp.build(`gem {{captureQuotedDep}}`, subpatterns, 'g');
const HOMEBREW = XRegExp.build(`(?:depends_on|conflicts_with)(?: cask:| formula:)? {{captureQuotedDep}}`, subpatterns, 'g');
const TYPESCRIPT_REFERENCE = XRegExp.build(`\\/{3}\\s?<reference path={{captureQuotedDep}}`, subpatterns, 'g');
const DOCKER_FROM = XRegExp.build(`FROM\\s([^\\n]*)`, subpatterns, 'g');
const VIM_PLUGIN = XRegExp.build(`(?:(?:(?:Neo)?Bundle(?:Lazy|Fetch)?)|Plug(?:in)?)\\s{{captureQuotedDep}}`, subpatterns, 'g');
const RUST_CRATE = XRegExp.build(`(?:extern crate|use) ([^:; ]+)`, subpatterns, 'g');
const PYTHON_IMPORT = XRegExp.build(`^\\s*(?:import|from)\\s([^\\s]*)`, subpatterns, 'gm');

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
