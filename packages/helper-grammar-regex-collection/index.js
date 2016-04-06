const REQUIRE = /require(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const REQUIRE_RESOLVE = /require(?:.resolve)(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const IMPORT = /import [\r\n\s\w{},*\$]*(?: from )?(['"][^'"\s]+['"])/g;
const GEM = /gem (['"][^'"\s]+['"])/g;

export {
  REQUIRE,
  REQUIRE_RESOLVE,
  IMPORT,
  GEM,
};
