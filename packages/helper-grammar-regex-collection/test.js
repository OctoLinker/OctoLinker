import assert from 'assert';
import * as REGEX from './index.js';

const fixtures = {
  IMPORT: {
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
      // require.resolve
      'require.resolve "foo"',
      'require.resolve("foo")',
      'var foo = require.resolve("foo")',
      ['var foo = require.resolve("foo")var bar = require.resolve("bar")', ['"foo"', '"bar"']],
    ],
    invalid: [
      'require(foo)',
      'require"foo"',
      'require ("foo")',
      'require (foo)',
      'require( "foo" )',
      'require("fo o")',
      // require.resolve
      'require.resolve(foo)',
      'require.resolve"foo"',
      'require.resolve ("foo")',
      'require.resolve (foo)',
      'require.resolve( "foo" )',
      'require.resolve("fo o")',
      'requireDresolve("foo")',
    ],
  },
  GEM: {
    valid: [
      'gem "foo"',
      ['gem \'foo\'', ['\'foo\'']],
    ],
    invalid: [
      'gem     "foo"',
    ],
  },
  HOMEBREW: {
    valid: [
      'depends_on "foo"',
      ['depends_on \'foo\'', ['\'foo\'']],
      'conflicts_with "foo"',
      ['conflicts_with \'foo\'', ['\'foo\'']],
      'depends_on cask: "foo"',
      ['depends_on cask: \'foo\'', ['\'foo\'']],
      'conflicts_with cask: "foo"',
      ['conflicts_with cask: \'foo\'', ['\'foo\'']],
      'depends_on formula: "foo"',
      ['depends_on formula: \'foo\'', ['\'foo\'']],
      'conflicts_with formula: "foo"',
      ['conflicts_with formula: \'foo\'', ['\'foo\'']],
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
  TYPESCRIPT_REFERENCE: {
    valid: [
      '/// <reference path="foo" />',
      '///<reference path="foo" />',
    ],
    invalid: [
      '// <reference path="foo" />',
    ],
  },
  DOCKER_FROM: {
    valid: [
      ['FROM foo', ['foo']],
      ['FROM foo:1.2.3', ['foo:1.2.3']],
      ['FROM foo:1.2.3-alpha', ['foo:1.2.3-alpha']],
      ['FROM foo/bar', ['foo/bar']],
    ],
    invalid: [
      'FROMfoo',
      // 'FROM\nfoo',
    ],
  },
  VIM_PLUGIN: {
    valid: [
      ["Plugin 'VundleVim/Vundle.vim'", ["'VundleVim/Vundle.vim'"]],
      ['Plugin "VundleVim/Vundle.vim"', ['"VundleVim/Vundle.vim"']],
      ["Plugin 'ctrlp.vim'", ["'ctrlp.vim'"]],
      ['Plugin "ctrlp.vim"', ['"ctrlp.vim"']],
    ],
    invalid: [
      "Plugin'ctrlp.vim'",
    ],
  },
  RUST_CRATE: {
    valid: [
      ['extern crate pcre;', ['pcre']],
      ['extern crate std as ruststd;', ['std']],
      ['use std::option::Option::{Some, None};', ['std']],
    ],
    invalid: [
      "extern create 'pcre'",
    ],
  },
};

describe('helper-grammar-regex-collection', () => {
  Object.keys(fixtures).forEach((grammar) => {
    const { valid, invalid } = fixtures[grammar];
    const regex = REGEX[grammar];

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
