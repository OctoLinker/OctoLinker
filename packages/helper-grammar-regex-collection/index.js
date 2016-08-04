const REQUIRE = /require(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const REQUIRE_RESOLVE = /require(?:.resolve)(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const IMPORT = /import [\r\n\s\w{},*\$]*(?: from )?(['"][^'"\s]+['"])/g;
const EXPORT = /export [\r\n\s\w{},*\$]*(?: from )(['"][^'"\s]+['"])/g;
const GEM = /gem (['"][^'"\s]+['"])/g;
const HOMEBREW = /(?:depends_on|conflicts_with)(?: cask:| formula:)? (['"][^'"\s]+['"])/g;
const TYPESCRIPT_REFERENCE = /\/{3}\s?<reference path=(['"][^'"\s]+['"])/g;
const DOCKER_FROM = /FROM\s([^\n]*)/g;
const VIM_PLUGIN = /(?:(?:(?:Neo)?Bundle(?:Lazy|Fetch)?)|Plug(?:in)?)\s(['"][^'"\s]+['"])/g;

export {
  REQUIRE,
  REQUIRE_RESOLVE,
  IMPORT,
  EXPORT,
  GEM,
  HOMEBREW,
  TYPESCRIPT_REFERENCE,
  DOCKER_FROM,
  VIM_PLUGIN,
};
