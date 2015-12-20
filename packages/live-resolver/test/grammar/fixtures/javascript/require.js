const valid = [
  [
    'var foo = require("foo")var bar = require("bar")',
    { 19: 'foo', 43: 'bar' },
  ], [
    'require("foo")require("bar");',
    { 9: 'foo', 23: 'bar' },
  ], [
    'require("foo")require("bar");',
    { 9: 'foo', 23: 'bar' },
  ], [
    'var foo = require("foo")require("bar");',
    { 19: 'foo', 33: 'bar' },
  ], [
    'var foo = require("foo")require("bar")',
    { 19: 'foo', 33: 'bar' },
  ], [
    'foo = require("foo")require("bar")',
    { 15: 'foo', 29: 'bar' },
  ], [
    'foo = require("foo")bar = require("bar")',
    { 15: 'foo', 35: 'bar' },
  ], [
    'foo = require("a-b")bar = require("c-d-e")',
    { 15: 'a-b', 35: 'c-d-e' },
  ], [
    'foo = require("./foo")bar = require("./bar")',
    { 15: './foo', 37: './bar' },
  ], [
    'const foo = require("./foo")bar = require("./bar")',
    { 21: './foo', 43: './bar' },
  ], [
    'require.resolve("foo")require.resolve("bar");',
    { 17: 'foo', 39: 'bar' },
  ], [
    'require "foo"',
    { 9: 'foo' },
  ],
];

const invalid = [
  'require"foo"',
  'require ("foo")',
  'require (foo)',
  'require( "foo" )',
  'require("fo o")',
].map((str) => [str]);

export default valid.concat(invalid);
