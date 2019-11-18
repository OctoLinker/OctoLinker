import getPosition from '../get-position';

describe('get-position', () => {
  const DEFAULT_REGEX = /(hello)/g;
  const REGEX_MULTI_LINES = /START\n(hello)\nEND/g;
  const REGEX_QUOTES = /(["']hello["'])/g;

  test.each([
    ['hello', DEFAULT_REGEX],
    ['foo hello', DEFAULT_REGEX],
    ['foo hello bar', DEFAULT_REGEX],
    ['foo\nhello bar', DEFAULT_REGEX],
    ['START\nhello\nEND', REGEX_MULTI_LINES],
    ['foo\nSTART\nhello\nEND', REGEX_MULTI_LINES],
    ['foo\nSTART\nhello\nEND', REGEX_MULTI_LINES],
    ['hello "hello"', REGEX_QUOTES],
    [`hello 'hello'`, REGEX_QUOTES],
    ['foo hello "hello"', REGEX_QUOTES],
    ['foo hello "hello" bar', REGEX_QUOTES],
    ['foo\nhello "hello" bar', REGEX_QUOTES],
  ])('match input "%s" with regexp "%s"', (input, regex) => {
    const result = getPosition(input, regex);
    const [{ lineNumber, startPos, endPos }] = result;

    expect(
      input.split('\n')[lineNumber - 1].substring(startPos, endPos),
    ).toEqual('hello');
    expect(result).toMatchSnapshot();
  });
});
