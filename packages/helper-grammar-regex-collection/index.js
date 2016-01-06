const REQUIRE = /require(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const REQUIRE_RESOLVE = /require(?:.resolve)(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const IMPORT = /import\s+(?:.+\s+from\s+)?(['"][^'"\s]+['"])/g;

export {
  REQUIRE,
  REQUIRE_RESOLVE,
  IMPORT,
};
