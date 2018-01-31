import { REQUIRE } from '@octolinker/helper-grammar-regex-collection';
import insertLink from '../index.js';

describe('insert-link', () => {
  const DEFAULT_REGEX = /foo ("\w+")/;

  function helper(
    html,
    regex = DEFAULT_REGEX,
    options = {},
    replaceIndex = '$1',
  ) {
    const el = document.createElement('div');
    el.innerHTML = html;

    insertLink(el, regex, options, replaceIndex);

    return el;
  }

  it('wraps the elements based on their char position which is specified in the keywords map', () => {
    expect(helper('foo <span><i>"</i>foo<i>"</i></span>')).toMatchSnapshot();
  });

  it('wraps the parent element when keyword is divided', () => {
    expect(
      helper('foo <span><i>"</i><span>fo</span>o<i>"</i></span>'),
    ).toMatchSnapshot();
  });

  it('wraps a nested element', () => {
    expect(
      helper('foo <div><span><i>"</i>foo<i>"</i></span></div>'),
    ).toMatchSnapshot();
  });

  it('wraps double quotes', () => {
    const input = 'foo <span>"foo"</span>';

    expect(helper(input)).toMatchSnapshot();
  });

  it('wraps single quotes', () => {
    const regex = /foo ('\w+')/;
    const input = "foo <span>'foo'</span>";

    expect(helper(input, regex)).toMatchSnapshot();
  });

  it('wraps mixed quotes', () => {
    const regex = /foo ('\w+")/;
    const input = 'foo <span>\'foo"</span>';

    expect(helper(input, regex)).toMatchSnapshot();
  });

  it('wraps a single word', () => {
    const regex = /foo (\w+)/;
    const input = 'foo <span>bar</span>';

    expect(helper(input, regex)).toMatchSnapshot();
  });

  it('wraps a single string', () => {
    const regex = /(bar)/;
    const input = 'foo bar baz';

    expect(helper(input, regex)).toMatchSnapshot();
  });

  it('wraps multiple strings', () => {
    const regex = /foo (bar)/;
    const input = 'foo bar baz';

    expect(helper(input, regex)).toMatchSnapshot();
  });

  it('wraps the element once', () => {
    const input = 'foo <span><i>"</i>foo<i>"</i></span>';
    const el = helper(input);
    insertLink(el, DEFAULT_REGEX, {}, '$1');

    expect(el).toMatchSnapshot();
  });

  it('adds the given data-* attributes', () => {
    const input = 'foo <span><i>"</i>foo<i>"</i></span>';
    const options = { value: '$1', bar: 'baz' };

    expect({
      ...helper(input, DEFAULT_REGEX, options).querySelector('a').dataset,
    }).toMatchSnapshot();
  });

  it('replace placeholder with capture group value', () => {
    const input = 'foo <span><i>"</i>foo<i>"</i></span>';
    const options = { value: 'go/$1.txt' };

    expect({
      ...helper(input, DEFAULT_REGEX, options).querySelector('a').dataset,
    }).toMatchSnapshot();
  });

  it('can handle if value is undefined', () => {
    const input = 'foo <span><i>"</i>foo<i>"</i></span>';
    const options = { value: undefined };

    expect({
      ...helper(input, DEFAULT_REGEX, options).querySelector('a').dataset,
    }).toMatchSnapshot();
  });

  it('can handle if value is null', () => {
    const input = 'foo <span><i>"</i>foo<i>"</i></span>';
    const options = { value: null };

    expect({
      ...helper(input, DEFAULT_REGEX, options).querySelector('a').dataset,
    }).toMatchSnapshot();
  });

  it('can handle if value is empty string', () => {
    const input = 'foo <span><i>"</i>foo<i>"</i></span>';
    const options = { value: '' };

    expect({
      ...helper(input, DEFAULT_REGEX, options).querySelector('a').dataset,
    }).toMatchSnapshot();
  });

  it('wraps the second regex match', () => {
    const options = { value: '$2', xx: 'yy' };
    const input = 'foo <i>"</i>bar<i>"</i> <i>"</i>baz<i>"</i>';
    const regex = /foo ("\w+") ("\w+")/;

    expect(helper(input, regex, options, '$2')).toMatchSnapshot();
  });

  it('does not remove closing parentheses from commented out require() calls', () => {
    const input = "// var faker = require('faker')";
    expect(helper(input, REQUIRE)).toMatchSnapshot();
  });
});
