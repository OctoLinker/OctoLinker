import getPosition from '../get-position';

describe('get-position', () => {
  const DEFAULT_REGEX = /(hello)/g;
  const REGEX_MULTI_LINES = /START\n(hello)\nEND/g;
  const REGEX_QUOTES = /(["']hello["'])/g;

  test.each([
    ['hello', DEFAULT_REGEX, 'hello'],
    ['foo hello', DEFAULT_REGEX, 'hello'],
    ['foo hello bar', DEFAULT_REGEX, 'hello'],
    ['foo\nhello bar', DEFAULT_REGEX, 'hello'],
    ['START\nhello\nEND', REGEX_MULTI_LINES, 'hello'],
    ['foo\nSTART\nhello\nEND', REGEX_MULTI_LINES, 'hello'],
    ['foo\nSTART\nhello\nEND', REGEX_MULTI_LINES, 'hello'],
    ['hello "hello"', REGEX_QUOTES, '"hello"'],
    [`hello 'hello'`, REGEX_QUOTES, "'hello'"],
    ['foo hello "hello"', REGEX_QUOTES, '"hello"'],
    ['foo hello "hello" bar', REGEX_QUOTES, '"hello"'],
    ['foo\nhello "hello" bar', REGEX_QUOTES, '"hello"'],
  ])('match input "%s" with regexp "%s"', (input, regex, expectedOutput) => {
    const result = getPosition(input, regex);
    const [{ lineNumber, startPos, endPos }] = result;

    expect(
      input.split('\n')[lineNumber - 1].substring(startPos, endPos),
    ).toEqual(expectedOutput);
    expect(result).toMatchSnapshot();
  });

  test('returns an empty array when regex does not match anything', () => {
    expect(getPosition('nomatch', DEFAULT_REGEX)).toStrictEqual([]);
  });

  test('returns an empty array when capture group is empty', () => {
    expect(getPosition('foo:bar', /foo:([0-9])?/g)).toStrictEqual([]);
  });
});
