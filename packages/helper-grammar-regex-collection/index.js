import XRegExp from 'xregexp';
import go from './go.js';

const REQUIRE = XRegExp.build(`require(?:\\.resolve)?(?:\\s|\\()\\s*['"]([^'"\\s]+)['"]\\s*\\)?`, null, 'g');
const IMPORT = XRegExp.build(`import [\\r\\n\\s\\w{},*\\$]*(?: from )?['"]([^'"\\s]+)['"]`, null, 'g');
const EXPORT = XRegExp.build(`export [\\r\\n\\s\\w{},*\\$]*(?: from )['"]([^'"\\s]+)['"]`, null, 'g');
const GEM = XRegExp.build(`gem ['"]([^'"\\s]+)['"]`, null, 'g');
const HOMEBREW = XRegExp.build(`(?:depends_on|conflicts_with)(?: cask:| formula:)? ['"]([^'"\\s]+)['"]`, null, 'g');
const TYPESCRIPT_REFERENCE = XRegExp.build(`\\/{3}\\s?<reference path=['"]([^'"\\s]+)['"]`, null, 'g');
const DOCKER_FROM = XRegExp.build(`FROM\\s([^\\n]*)`, null, 'g');
const VIM_PLUGIN = XRegExp.build(`(?:(?:(?:Neo)?Bundle(?:Lazy|Fetch)?)|Plug(?:in)?)\\s['"]([^'"\\s]+)['"]`, null, 'g');
const RUST_CRATE = XRegExp.build(`(?:extern crate|use) ([^:; ]+)`, null, 'g');
const PYTHON_IMPORT = XRegExp.build(`^\\s*(?:import|from)\\s([^\\s]*)`, null, 'gm');

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
