import assert from 'assert';
import {requireRegex, importRegex} from '../../grammar/javascript.js';

function matchHelper(regex, str) {
  const actual = [];
  let match;

  while (match = regex.exec(str)) { // eslint-disable-line no-cond-assign
    actual.push(match[1]);
  }

  return actual;
}

describe('javascript', () => {
  describe('require statment', () => {
    [
      ['var foo = require(\'foo\')var bar = require(\'bar\')', ['foo', 'bar']],
      ['require(\'foo\')require(\'bar\');', ['foo', 'bar']],
      ['require("foo")require("bar");', ['foo', 'bar']],
      ['require("foo")require("bar");', ['foo', 'bar']],
      ['var foo = require("foo")require("bar");', ['foo', 'bar']],
      ['var foo = require("foo")require("bar")', ['foo', 'bar']],
      ['foo = require("foo")require("bar")', ['foo', 'bar']],
      ['foo = require("foo")bar = require("bar")', ['foo', 'bar']],
      ['foo = require("a-b")bar = require("c-d-e")', ['a-b', 'c-d-e']],
      ['foo = require("./foo")bar = require("./bar")', ['./foo', './bar']],
      ['const foo = require("./foo")bar = require("./bar")', ['./foo', './bar']],
      ['require.resolve("foo")require.resolve("bar");', ['foo', 'bar']],
    ].forEach(([input, output]) => {
      it(input, () => {
        assert.deepEqual(matchHelper(requireRegex, input), output);
      });
    });
  });

  describe('import statment', () => {
    [
      ['import foo from "foo"', ['foo']],
      ['import * as bar from "foo"', ['foo']],
      ['import { bar } from "foo"', ['foo']],
      ['import { foo as bar } from "foo"', ['foo']],
      ['import { foo, bar } from "foo"', ['foo']],
      ['import { foo, bar as baz } from "foo"', ['foo']],
      ['import foo, {bar} from "foo"', ['foo']],
      ['import foo, * as bar from "foo"', ['foo']],
      ['import "foo"', ['foo']],
    ].forEach(([input, output]) => {
      it(input, () => {
        assert.deepEqual(matchHelper(importRegex, input), output);
      });
    });
  });
});
