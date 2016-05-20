import assert from 'assert';
import {
  IMPORT,
  EXPORT,
  REQUIRE,
  REQUIRE_RESOLVE,
  GEM,
  HOMEBREW,
} from './index.js';

const fixtures = {
  IMPORT: {
    regex: IMPORT,
    valid: [
      'import foo from "foo"',
      'import _ from "foo"',
      'import $ from "foo"',
      'import * as bar from "foo"',
      'import { bar } from "foo"',
      'import { foo as bar } from "foo"',
      'import { foo, bar } from "foo"',
      'import { foo, bar as baz } from "foo"',
      'import foo, {bar} from "foo"',
      'import foo, * as bar from "foo"',
      'import "foo"',
      'import \nfoo \nfrom \n"foo"',
      'import {\nbar } from "foo"',
      'import { bar\n } from "foo"',
      'import { \nbar\n } from "foo"',
      'import foo\n, {bar} from "foo"',
      'import foo, {bar} \nfrom "foo"',
      'import foo, {\nbar} from "foo"',
      'import foo, {bar\n} from "foo"',
    ],
    invalid: [
      'import "fo o"',
      // TODO tweak IMPORT regexp so that invalid statements are not matched
      // 'import foo "foo"',
      // 'import from "foo"',
    ],
  },
  EXPORT: {
    regex: EXPORT,
    valid: [
      'export * from "foo"',
      'export { foo, bar } from "foo"',
      'export { foo as bar} from "foo"',
      'export { foo, bar as baz } from "foo"',
      'export {\nbar } from "foo"',
      'export { bar\n } from "foo"',
      'export { \nbar\n } from "foo"',
    ],
    invalid: [
      'export * from "fo o"',
    ],
  },
  REQUIRE: {
    regex: REQUIRE,
    valid: [
      'require("foo")',
      'var foo = require("foo")',
      'var $ = require("foo")',
      'var _ = require("foo")',
      ['var foo = require("foo")var bar = require("bar")', ['"foo"', '"bar"']],
      ['require("foo")require("bar");', ['"foo"', '"bar"']],
      ['require("foo")require("bar");', ['"foo"', '"bar"']],
      ['var foo = require("foo")require("bar");', ['"foo"', '"bar"']],
      ['var foo = require("foo")require("bar")', ['"foo"', '"bar"']],
      ['foo = require("foo")require("bar")', ['"foo"', '"bar"']],
      ['foo = require("foo")bar = require("bar")', ['"foo"', '"bar"']],
      ['foo = require("a-b")bar = require("c-d-e")', ['"a-b"', '"c-d-e"']],
      ['foo = require("./foo")bar = require("./bar")', ['"./foo"', '"./bar"']],
      ['const foo = require("./foo")bar = require("./bar")', ['"./foo"', '"./bar"']],
      'require "foo"',
    ],
    invalid: [
      'require(foo)',
      'require"foo"',
      'require ("foo")',
      'require (foo)',
      'require( "foo" )',
      'require("fo o")',
    ],
  },
  REQUIRE_RESOLVE: {
    regex: REQUIRE_RESOLVE,
    valid: [
      'require.resolve "foo"',
      'require.resolve("foo")',
      'var foo = require.resolve("foo")',
      ['var foo = require.resolve("foo")var bar = require.resolve("bar")', ['"foo"', '"bar"']],
    ],
    invalid: [
      'require.resolve(foo)',
      'require.resolve"foo"',
      'require.resolve ("foo")',
      'require.resolve (foo)',
      'require.resolve( "foo" )',
      'require.resolve("fo o")',
    ],
  },
  GEM: {
    regex: GEM,
    valid: [
      'gem "foo"',
      ['gem \'foo\'', ['\'foo\'']],
    ],
    invalid: [
      'gem     "foo"',
    ],
  },
  HOMEBREW: {
    regex: HOMEBREW,
    valid: [
      'depends_on "foo"',
      ['depends_on \'foo\'', ['\'foo\'']],
      'conflicts_with "foo"',
      ['conflicts_with \'foo\'', ['\'foo\'']],
    ],
    // These probably aren't actually invalid, but
    // https://github.com/Homebrew/homebrew-core/ has no occurences of multiple
    // spaces after depends_on/conflicts_with, and I'm guessing their lint
    // prohibits them anyway.
    invalid: [
      'depends_on     "foo"',
      'conflicts_with     "foo"',
    ],
  },
};

describe('helper-grammar-regex-collection', () => {
  Object.keys(fixtures).forEach((grammar) => {
    const { regex, valid, invalid } = fixtures[grammar];

    beforeEach(() => {
      regex.lastIndex = 0;
    });

    describe(grammar, function () {
      describe('valid', function () {
        valid.forEach((statement) => {
          const text = Array.isArray(statement) ? statement[0] : statement;
          const expected = Array.isArray(statement) ? statement[1] : ['"foo"'];

          it(text, () => {
            let match;
            let result = [];

            while (match = regex.exec(text)) { // eslint-disable-line no-cond-assign
              result = result.concat(match.slice(1));
            }

            assert.deepEqual(result, expected);
          });
        });
      });

      describe('invalid', function () {
        invalid.forEach((statement) => {
          it(statement, () => {
            assert.equal(regex.exec(statement), null);
          });
        });
      });
    });
  });
});
