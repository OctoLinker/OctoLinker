const REQUIRE = /require(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const REQUIRE_RESOLVE = /require(?:.resolve)(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const IMPORT = /import [\r\n\s\w{},*\$]*(?: from )?(['"][^'"\s]+['"])/g;
const EXPORT = /export [\r\n\s\w{},*\$]*(?: from )(['"][^'"\s]+['"])/g;
const GEM = /gem (['"][^'"\s]+['"])/g;
// TODO support `formula:` as well. See
// https://github.com/caskroom/homebrew-cask/blob/714bd04bebd195500843dbb2cdbef21d65ff8852/doc/cask_language_reference/stanzas/depends_on.md#depends_on-formula
// Ideally, we'd have a way of knowing which Homebrew tap is referred to, but
// we could just use https://github.com/Homebrew/homebrew-core/
const HOMEBREW = /(?:depends_on|conflicts_with)(?: cask:)? (['"][^'"\s]+['"])/g;

export {
  REQUIRE,
  REQUIRE_RESOLVE,
  IMPORT,
  EXPORT,
  GEM,
  HOMEBREW,
};
