import assert from 'assert';
import {
  IMPORT,
  REQUIRE,
  REQUIRE_RESOLVE,
} from './index.js';

const fixtures = {
  IMPORT: {
    regex: IMPORT,
    valid: [
      'import foo from "foo"',
      'import * as bar from "foo"',
      'import { bar } from "foo"',
      'import { foo as bar } from "foo"',
      'import { foo, bar } from "foo"',
      'import { foo, bar as baz } from "foo"',
      'import foo, {bar} from "foo"',
      'import foo, * as bar from "foo"',
      'import "foo"',
    ],
    invalid: [
      'import foo',
      'import "fo o"',
      'import from "foo"',
    ],
  },
  REQUIRE: {
    regex: REQUIRE,
    valid: [
      'require("foo")',
      'var foo = require("foo")',
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
};

describe('helper-grammar-regex-collection', () => {
  Object.keys(fixtures).forEach((grammar) => {
    const {regex, valid, invalid} = fixtures[grammar];

    beforeEach(() => {
      regex.lastIndex = 0;
    });

    describe(grammar, function() {
      describe('valid', function() {
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

      describe('invalid', function() {
        invalid.forEach((statement) => {
          it(statement, () => {
            assert.equal(regex.exec(statement), null);
          });
        });
      });
    });
  });
});
