const valid = [
  [
    'import foo from "foo"',
    { 17: 'foo' },
  ], [
    'import * as bar from "foo"',
    { 22: 'foo' },
  ], [
    'import { bar } from "foo"',
    { 21: 'foo' },
  ], [
    'import { foo as bar } from "foo"',
    { 28: 'foo' },
  ], [
    'import { foo, bar } from "foo"',
    { 26: 'foo' },
  ], [
    'import { foo, bar as baz } from "foo"',
    { 33: 'foo' },
  ], [
    'import foo, {bar} from "foo"',
    { 24: 'foo' },
  ], [
    'import foo, * as bar from "foo"',
    { 27: 'foo' },
  ], [
    'import "foo"',
    { 8: 'foo' },
  ],
];

const invalid = [
  'import foo',
  'import "fo o"',
  'import from "foo"',
].map((str) => [str]);

export default valid.concat(invalid);
