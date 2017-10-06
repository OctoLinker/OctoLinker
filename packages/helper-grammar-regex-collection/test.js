/* eslint import/namespace: [2, { allowComputed: true }] */

import assert from 'assert';
import * as REGEX from './index.js';

const fixtures = {
  NODEJS_RELATIVE_PATH_JOIN: {
    valid: [['app.set("views", path.join(__dirname, "/views");', ['/views']]],
    invalid: ['app.set("views", pathDjoin(__dirname, "/views");'],
  },
  NODEJS_RELATIVE_PATH: {
    valid: [['app.set("views", __dirname + "/views");', ['/views']]],
    invalid: ['app.set("views", path.join(__dirname, "/views");'],
  },
  IMPORT: {
    valid: [
      // See https://github.com/OctoLinker/browser-extension/issues/338#issuecomment-306065970
      [
        "* import {Component, NgZone} from '\\@angular/core';",
        ['\\@angular/core'],
      ],
      ["* import {NgIf} from '\\@angular/common';", ['\\@angular/common']],

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
    invalid: ['export * from "fo o"'],
  },
  REQUIRE: {
    valid: [
      'require("foo")',
      'require( "foo" )',
      'require(  "foo"  )',
      'require(\t"foo"\t)',
      'require ("foo")',
      'var foo = require("foo")',
      'var $ = require("foo")',
      'var _ = require("foo")',
      ['var foo = require("foo")var bar = require("bar")', ['foo', 'bar']],
      ['require("foo")require("bar");', ['foo', 'bar']],
      ['require("foo")require("bar");', ['foo', 'bar']],
      ['var foo = require("foo")require("bar");', ['foo', 'bar']],
      ['var foo = require("foo")require("bar")', ['foo', 'bar']],
      ['foo = require("foo")require("bar")', ['foo', 'bar']],
      ['foo = require("foo")bar = require("bar")', ['foo', 'bar']],
      ['foo = require("a-b")bar = require("c-d-e")', ['a-b', 'c-d-e']],
      ['foo = require("./foo")bar = require("./bar")', ['./foo', './bar']],
      [
        'const foo = require("./foo")bar = require("./bar")',
        ['./foo', './bar'],
      ],
      'require "foo"',
      'require_relative "foo"',
      // require.resolve
      'require.resolve "foo"',
      'require.resolve("foo")',
      'require.resolve( "foo" )',
      'require.resolve(  "foo"  )',
      'require.resolve(\t"foo"\t)',
      'require.resolve ("foo")',
      'var foo = require.resolve("foo")',
      [
        'var foo = require.resolve("foo")var bar = require.resolve("bar")',
        ['foo', 'bar'],
      ],
      // proxyquire
      'proxyquire "foo"',
      'proxyquire("foo")',
      'proxyquire( "foo" )',
      'proxyquire(  "foo"  )',
      'proxyquire(\t"foo"\t)',
      'proxyquire ("foo")',
      'var foo = proxyquire("foo")',
      [
        'var foo = proxyquire("foo")var bar = proxyquire("bar")',
        ['foo', 'bar'],
      ],
      // JavaScript Dynamic Imports import("./module")
      'import("foo")',
      'import( "foo" )',
      'import(  "foo"  )',
      'import(\t"foo"\t)',
      'import ("foo")',
      'var foo = import("foo")',
      'var $ = import("foo")',
      'var _ = import("foo")',
      ['var foo = import("foo")var bar = import("bar")', ['foo', 'bar']],
      ['import("foo")import("bar");', ['foo', 'bar']],
      ['import("foo")import("bar");', ['foo', 'bar']],
      ['var foo = import("foo")import("bar");', ['foo', 'bar']],
      ['var foo = import("foo")import("bar")', ['foo', 'bar']],
      ['foo = import("foo")import("bar")', ['foo', 'bar']],
      ['foo = import("foo")bar = import("bar")', ['foo', 'bar']],
      ['foo = import("a-b")bar = import("c-d-e")', ['a-b', 'c-d-e']],
      ['foo = import("./foo")bar = import("./bar")', ['./foo', './bar']],
      ['const foo = import("./foo")bar = import("./bar")', ['./foo', './bar']],
      'import "foo"',
    ],
    invalid: [
      'require(foo)',
      'require"foo"',
      'require (foo)',
      'require("fo o")',
      'require_relative(foo)',
      'require_relative"foo"',
      'require_relative (foo)',
      'require_relative("fo o")',
      // require.resolve
      'require.resolve(foo)',
      'require.resolve"foo"',
      'require.resolve (foo)',
      'require.resolve("fo o")',
      'requireDresolve("foo")',
      // proxyquire
      'proxyquire(foo)',
      'proxyquire"foo"',
      'proxyquire (foo)',
      'proxyquire("fo o")',
      // JavaScript Dynamic Imports import("./module")
      'import(foo)',
      'import"foo"',
      'import (foo)',
      'import("fo o")',
      // import.resolve
      'import.resolve(foo)',
      'import.resolve"foo"',
      'import.resolve ("foo")',
      'import.resolve (foo)',
      'import.resolve("fo o")',
      'import.resolve "foo"',
      'import.resolve("foo")',
      'import.resolve( "foo" )',
      'import.resolve(  "foo"  )',
      'import.resolve(\t"foo"\t)',
      'var foo = import.resolve("foo")',
      'var foo = import.resolve("foo")var bar = import.resolve("bar")',
    ],
  },
  GEM: {
    valid: ['gem "foo"', ["gem 'foo'", ['foo']]],
    invalid: ['gem     "foo"'],
  },
  HASKELL_IMPORT: {
    valid: [
      ['import Foo', ['Foo']],
      ['import Foo.Bar', ['Foo.Bar']],
      ['import qualified Foo', ['Foo']],
      ['import qualified Foo.Bar', ['Foo.Bar']],
      ['import Foo.Bar.Baz', ['Foo.Bar.Baz']],
      ['import Foo Bar', ['Foo']],
      ['import Foo', ['Foo']],
      ['import Foo as Bar', ['Foo']],
      ['import Foo ()', ['Foo']],
      ['import Foo', ['Foo']],
    ],
    invalid: [
      ['limport Foo'],
      ['imports Foo'],
      ['import "Foo"'],
      ['import /Foo'],
      ['import .foo'],
      ['import foo'],
    ],
  },
  HOMEBREW: {
    valid: [
      'depends_on "foo"',
      ["depends_on 'foo'", ['foo']],
      'conflicts_with "foo"',
      ["conflicts_with 'foo'", ['foo']],
      'depends_on cask: "foo"',
      ["depends_on cask: 'foo'", ['foo']],
      'conflicts_with cask: "foo"',
      ["conflicts_with cask: 'foo'", ['foo']],
      'depends_on formula: "foo"',
      ["depends_on formula: 'foo'", ['foo']],
      'conflicts_with formula: "foo"',
      ["conflicts_with formula: 'foo'", ['foo']],
    ],
    // These probably aren't actually invalid, but
    // https://github.com/Homebrew/homebrew-core/ has no occurences of multiple
    // spaces after depends_on/conflicts_with, and I'm guessing their lint
    // prohibits them anyway.
    invalid: ['depends_on     "foo"', 'conflicts_with     "foo"'],
  },
  TYPESCRIPT_REFERENCE: {
    valid: ['/// <reference path="foo" />', '///<reference path="foo" />'],
    invalid: ['// <reference path="foo" />'],
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
      ["Plugin 'VundleVim/Vundle.vim'", ['VundleVim/Vundle.vim']],
      ['Plugin "VundleVim/Vundle.vim"', ['VundleVim/Vundle.vim']],
      ["Plugin 'ctrlp.vim'", ['ctrlp.vim']],
      ['Plugin "ctrlp.vim"', ['ctrlp.vim']],
    ],
    invalid: ["Plugin'ctrlp.vim'"],
  },
  RUST_CRATE: {
    valid: [
      ['extern crate pcre;', ['pcre']],
      ['extern crate std as ruststd;', ['std']],
      ['use std::option::Option::{Some, None};', ['std']],
    ],
    invalid: [
      "extern create 'pcre'",
      'because it',
      'everything is currently by shared reference, the easiest thing is to use a `RefCell`',
    ],
  },
  PYTHON_IMPORT: {
    valid: [
      ['import foo', ['foo']],
      ['\nimport foo', ['foo']],
      ['import fo_o', ['fo_o']],
      ['import .foo', ['.foo']],
      ['import foo as bar', ['foo']],
      ['from foo import bar', ['foo']],
      ['from foo import bar, baz', ['foo']],
      ['from foo.bar import baz', ['foo.bar']],
    ],
    invalid: ['simport foo', 'simport\nfoo', '# from the'],
  },
  REQUIREMENTS_TXT: {
    valid: [
      ['wheel==0.23.0', ['wheel']],
      ['Yarg==0.1.9', ['Yarg']],
      ['docopt==0.6.2', ['docopt']],
      ['Flask-Cache==0.13.1', ['Flask-Cache']],
      ['flake8', ['flake8']],
    ],
    invalid: ['-r requirements.txt'],
  },
  CSS_IMPORT: {
    valid: [
      "@import 'foo'",
      '@import "foo"',
      '@import "foo" bar',
      '@import URL("foo")',
      '@import url("foo")',
      '@import url("foo") bar',
    ],
    invalid: ['@import foo', '@import url(foo)'],
  },
  LESS_IMPORT: {
    valid: [
      '@import (less) "foo";',
      '@import (optional, reference) "foo";',
      // below copied from CSS_IMPORT
      "@import 'foo'",
      '@import "foo"',
      '@import "foo" bar',
      '@import URL("foo")',
      '@import url("foo")',
      '@import url("foo") bar',
      // above copied from CSS_IMPORT
    ],
    invalid: [
      // below copied from CSS_IMPORT
      '@import foo',
      '@import url(foo)',
      // above copied from CSS_IMPORT
    ],
  },
  HTML_IMPORT: {
    valid: ['<link rel="import" href="foo">'],
    invalid: ['<link href="foo">'],
  },
  go: {
    valid: [
      'import "foo"',
      'import _ "foo"',
      'import . "foo"',
      'import bar "foo"',
      ['import "./foo"', ['./foo']],
      ['import "./foo/bar"', ['./foo/bar']],
      '\nimport "foo"',
      ['import "fo_o"', ['fo_o']],
      ['import "github.com/foo/bar"', ['github.com/foo/bar']],
      ['import "bitbucket.org/foo/bar"', ['bitbucket.org/foo/bar']],
      ['import "launchpad.net/foo/bar"', ['launchpad.net/foo/bar']],
      ['import "hub.jazz.net/foo/bar"', ['hub.jazz.net/foo/bar']],
      ['import "gopkg.in/foo/bar"', ['gopkg.in/foo/bar']],
      'import (\n"foo"\n)',
      'import (\n_ "foo"\n)',
      'import (\n. "foo"\n)',
      'import (\nbar "foo"\n)',
      'import (\n    "foo"\n)',
      ['import (\n"./foo"\n"./bar"\n)', ['./foo', './bar']],
      ['import (\n"github.com/foo/bar"\n)', ['github.com/foo/bar']],
      ['import (\n"bitbucket.org/foo/bar"\n)', ['bitbucket.org/foo/bar']],
      ['import (\n"launchpad.net/foo/bar"\n)', ['launchpad.net/foo/bar']],
      ['import (\n"hub.jazz.net/foo/bar"\n)', ['hub.jazz.net/foo/bar']],
      ['import (\n"gopkg.in/foo/bar"\n)', ['gopkg.in/foo/bar']],
      [
        'import (\n"github.com/foo"\n"github.com/bar"\n)',
        ['github.com/foo', 'github.com/bar'],
      ],
      [
        'import (\n"github.com/foo"\n\n"github.com/bar"\n)',
        ['github.com/foo', 'github.com/bar'],
      ],
      ['import (\nbar "github.com/foo/bar"\n)', ['github.com/foo/bar']],
    ],
    invalid: [
      'simport foo',
      'simport\nfoo',
      'import "octo.com/foo/bar"',
      'import (\n"octo.com/foo/bar"\n)',
    ],
  },
  NET_PACKAGE: {
    valid: [
      '<package id="foo" version="2.7.7.02" targetFramework="net45" />',
      '< package id="foo" version="2.7.7.02" targetFramework="net45" />',
    ],
    invalid: [
      '<packages id="Antlr2.Runtime" version="2.7.7.02" targetFramework="net45" />',
      '<package version="2.7.7.02" targetFramework="net45" />',
    ],
  },
};

function fixturesIterator(fixturesList, next) {
  fixturesList.forEach(statement => {
    const text = Array.isArray(statement) ? statement[0] : statement;
    const expected = Array.isArray(statement) ? statement[1] : ['foo'];

    next(text, expected);
  });
}

describe('helper-grammar-regex-collection', () => {
  Object.keys(fixtures).forEach(grammar => {
    const { valid, invalid } = fixtures[grammar];
    let regexes = REGEX[grammar];

    // Help ensure that `regexes` is a function that returns an array of RegExp
    if (regexes instanceof RegExp) {
      regexes = [regexes];
    }
    if (Array.isArray(regexes)) {
      const oldRegexes = regexes;
      regexes = () => oldRegexes;
    }

    describe(grammar, () => {
      describe('valid', () => {
        fixturesIterator(valid, (text, expected) => {
          it(text, () => {
            let match;
            let result = [];

            regexes(text).forEach(regex => {
              // eslint-disable-next-line
              while (match = regex.exec(text)) {
                result = result.concat(match.slice(1));
              }
            });

            assert.deepEqual(result, expected);
          });
        });
      });

      describe('invalid', () => {
        fixturesIterator(invalid, text => {
          it(text, () => {
            regexes(text).forEach(regex => {
              assert.equal(regex.exec(text), null);
            });
          });
        });
      });
    });
  });
});
