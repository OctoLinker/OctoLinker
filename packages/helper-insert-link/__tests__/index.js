import { REQUIRE } from '@octolinker/helper-grammar-regex-collection';
import insertLink from '../index';

describe('insert-link', () => {
  const DEFAULT_REGEX = /foo ("\w+")/;
  const fakePlugin = {
    resolve: jest.fn().mockReturnValue('urlsToResolve'),
  };

  function helper(html, regex = DEFAULT_REGEX, plugin = fakePlugin, meta = {}) {
    const el = document.createElement('div');
    const blob = { el };
    el.innerHTML = html;

    const matches = insertLink(blob, regex, plugin, meta);

    return {
      blob,
      el,
      matches,
    };
  }

  it('wraps the elements based on their char position which is specified in the keywords map', () => {
    expect(helper('foo <span><i>"</i>foo<i>"</i></span>').el).toMatchSnapshot();
  });

  it('wraps the parent element when keyword is divided', () => {
    expect(
      helper('foo <span><i>"</i><span>fo</span>o<i>"</i></span>').el,
    ).toMatchSnapshot();
  });

  it('wraps a nested element', () => {
    expect(
      helper('foo <div><span><i>"</i>foo<i>"</i></span></div>').el,
    ).toMatchSnapshot();
  });

  it('wraps double quotes', () => {
    const input = 'foo <span>"foo"</span>';

    expect(helper(input).el).toMatchSnapshot();
  });

  it('wraps single quotes', () => {
    const regex = /foo ('\w+')/;
    const input = "foo <span>'foo'</span>";

    expect(helper(input, regex).el).toMatchSnapshot();
  });

  it('wraps mixed quotes', () => {
    const regex = /foo ('\w+")/;
    const input = 'foo <span>\'foo"</span>';

    expect(helper(input, regex).el).toMatchSnapshot();
  });

  it('wraps a single word', () => {
    const regex = /foo (\w+)/;
    const input = 'foo <span>bar</span>';

    expect(helper(input, regex).el).toMatchSnapshot();
  });

  it('wraps a single string', () => {
    const regex = /(bar)/;
    const input = 'foo bar baz';

    expect(helper(input, regex).el).toMatchSnapshot();
  });

  it('wraps multiple strings', () => {
    const regex = /foo (bar)/;
    const input = 'foo bar baz';

    expect(helper(input, regex).el).toMatchSnapshot();
  });

  it('wraps the element once', () => {
    const input = 'foo <span><i>"</i>foo<i>"</i></span>';
    const { blob, el, matches: match1 } = helper(input);
    const match2 = insertLink(blob, DEFAULT_REGEX, fakePlugin);

    expect(match1.length).toBe(1);
    expect(match2.length).toBe(0);

    expect(el).toMatchSnapshot();
  });

  it('does not remove closing parentheses from commented out require() calls', () => {
    const input = "// var faker = require('faker')";
    expect(helper(input, REQUIRE).el).toMatchSnapshot();
  });

  describe('returns', () => {
    it('returns an array', () => {
      const input = 'foo <span>"bar"</span>';

      expect(helper(input).matches.length).toBe(1);
      expect(helper(input).matches).toMatchSnapshot();
    });
  });
});
