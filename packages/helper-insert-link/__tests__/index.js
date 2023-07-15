import { REQUIRE } from '@octolinker/helper-grammar-regex-collection';
import insertLink from '../index';

describe('insert-link', () => {
  const DEFAULT_REGEX = /foo ("\w+")/g;
  const fakePlugin = {
    resolve: jest.fn().mockReturnValue('urlsToResolve'),
  };

  function helper(html, regex = DEFAULT_REGEX, plugin = fakePlugin, meta = {}) {
    const el = document.createElement('div');
    el.innerHTML = `<div id="LC1">${html}</div>`;

    const blob = {
      el,
      isDiff: false,
      firstLineNumber: 1,
      lineSelector() {
        return `#LC1`;
      },
      toString() {
        return el.textContent;
      },
    };

    const matches = insertLink(blob, regex, plugin, meta);

    // Remove root element for a pretty output
    const testEl = el.firstChild;
    testEl.removeAttribute('id');

    return {
      blob,
      el: testEl,
      matches,
    };
  }

  it('wraps the elements based on their char position which is specified in the keywords map', () => {
    expect(helper('foo <span><i>"</i>foo<i>"</i></span>').el).toMatchSnapshot();
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
    const regex = /foo ('\w+')/g;
    const input = "foo <span>'foo'</span>";

    expect(helper(input, regex).el).toMatchSnapshot();
  });

  it('wraps mixed quotes', () => {
    const regex = /foo ('\w+")/g;
    const input = 'foo <span>\'foo"</span>';

    expect(helper(input, regex).el).toMatchSnapshot();
  });

  it('wraps a single word', () => {
    const regex = /foo (\w+)/g;
    const input = 'foo <span>bar</span>';

    expect(helper(input, regex).el).toMatchSnapshot();
  });

  it('wraps a single string', () => {
    const regex = /(bar)/g;
    const input = 'foo bar baz';

    expect(helper(input, regex).el).toMatchSnapshot();
  });

  it('wraps multiple strings', () => {
    const regex = /foo (bar)/g;
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

  it('does not wrap already links twice', () => {
    const input =
      'foo <span><a class="octolinker-link" data-pjax="true">"foo"</a></span>';

    expect(helper(input).el).toMatchSnapshot();
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

    it('returns an array with values', () => {
      const input = 'foo <span>"bar"</span>';

      fakePlugin.resolve.mockReturnValue([undefined, null, '', 'bar']);
      expect(helper(input).matches[0].urls).toEqual(['bar']);
    });
  });

  describe('when findAndReplaceDOMText does not find any element', () => {
    it('wraps a nested element', () => {
      const regex = /foo (bar)/g;
      const input = 'foo b<span>ar</span>';

      expect(helper(input, regex).el).toMatchSnapshot();
    });

    it('wraps the matching group element', () => {
      const regex = /bar (bar)/g;
      const input = 'b<span>ar</span> b<span>ar</span>';

      expect(helper(input, regex).el).toMatchSnapshot();
    });
  });
});
