const REQUIRE = /require(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const REQUIRE_RESOLVE = /require(?:.resolve)(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const IMPORT = /import [\r\n\s\w{},*\$]*(?: from )?(['"][^'"\s]+['"])/g;
const EXPORT = /export [\r\n\s\w{},*\$]*(?: from )(['"][^'"\s]+['"])/g;
const GEM = /gem (['"][^'"\s]+['"])/g;
const HOMEBREW = /(?:depends_on|conflicts_with) (['"][^'"\s]+['"])/g;

export {
  REQUIRE,
  REQUIRE_RESOLVE,
  IMPORT,
  EXPORT,
  GEM,
  HOMEBREW,
};
