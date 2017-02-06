import assert from 'assert';
import $ from 'jquery';
import insertLink from '../lib/insert-link.js';
import { REQUIRE } from '../packages/helper-grammar-regex-collection';

describe('insert-link', () => {
  const DEFAULT_REGEX = /foo ("\w+")/;

  function helper(html, regex = DEFAULT_REGEX, options = {}, replaceIndex = '$1') {
    const el = document.createElement('div');
    el.innerHTML = html;

    insertLink(el, regex, options, replaceIndex);

    return el;
  }

  function createExpectation(el, dataAttr = {}) {
    let dataAttributes = '';

    for (const [key, value] of Object.entries(dataAttr)) {
      dataAttributes += ` data-${key}="${value}"`;
    }

    const start = `<a class="octolinker-link"${dataAttributes}><span>`;
    const input = el.replace(/\$0/g, '');
    const output = el.replace('$0', start).replace('$0', '</span></a>');

    return {
      input,
      output,
    };
  }

  function simpleAssert(el) {
    const { input, output } = createExpectation(el);

    assert.equal(helper(input).innerHTML, output);
  }

  it('wraps the elements based on their char position which is specified in the keywords map', () => {
    simpleAssert('foo <span><i>"</i>$0foo$0<i>"</i></span>');
  });

  it('wraps the parent element when keyword is divided', () => {
    simpleAssert('foo $0<span><i>"</i><span>fo</span>o<i>"</i></span>$0');
  });

  it('wraps a nested element', () => {
    simpleAssert('foo <div><span><i>"</i>$0foo$0<i>"</i></span></div>');
  });

  it('wraps double quotes', () => {
    const { input } = createExpectation('foo <span>"foo"</span>');
    const { output } = createExpectation('foo <span><span>"$0foo$0"</span></span>');

    assert.equal(helper(input).innerHTML, output);
  });

  it('wraps single quotes', () => {
    const regex = /foo ('\w+')/;
    const { input } = createExpectation('foo <span>\'foo\'</span>');
    const { output } = createExpectation('foo <span><span>\'$0foo$0\'</span></span>');

    assert.equal(helper(input, regex).innerHTML, output);
  });

  it('wraps mixed quotes', () => {
    const regex = /foo ('\w+")/;
    const { input } = createExpectation('foo <span>\'foo"</span>');
    const { output } = createExpectation('foo <span><span>\'$0foo$0"</span></span>');

    assert.equal(helper(input, regex).innerHTML, output);
  });

  it('wraps a single word', () => {
    const regex = /foo (\w+)/;
    const { input } = createExpectation('foo <span>bar</span>');
    const { output } = createExpectation('foo <span><span>$0bar$0</span></span>');

    assert.equal(helper(input, regex).innerHTML, output);
  });

  it('wraps a single string', () => {
    const regex = /(bar)/;
    const { input } = createExpectation('foo bar baz');
    const { output } = createExpectation('foo <span>$0bar$0</span> baz');

    assert.equal(helper(input, regex).innerHTML, output);
  });

  it('wraps multiple strings', () => {
    const regex = /foo (bar)/;
    const { input } = createExpectation('foo bar baz');
    const { output } = createExpectation('<span>foo $0bar$0</span> baz');

    assert.equal(helper(input, regex).innerHTML, output);
  });

  it('wraps the element once', () => {
    const { input } = createExpectation('foo <span><i>"</i>$0foo$0<i>"</i></span>', { value: 'foo' });
    assert.equal($('.octolinker-link', helper(helper(input).innerHTML)).length, 1);
  });

  it('adds the given data-* attributes', () => {
    const { input } = createExpectation('foo <span><i>"</i>$0foo$0<i>"</i></span>');
    const options = { value: '$1', bar: 'baz' };

    assert.deepEqual($('.octolinker-link', helper(input, DEFAULT_REGEX, options)).data(), {
      value: 'foo',
      bar: 'baz',
    });
  });

  it('replace placholder with capture group value', () => {
    const { input } = createExpectation('foo <span><i>"</i>$0foo$0<i>"</i></span>');
    const options = { value: 'go/$1.txt' };

    assert.deepEqual($('.octolinker-link', helper(input, DEFAULT_REGEX, options)).data(), {
      value: 'go/foo.txt',
    });
  });

  it('can handle if value is undefined', () => {
    const { input } = createExpectation('foo <span><i>"</i>$0foo$0<i>"</i></span>');
    const options = { value: undefined };

    assert.deepEqual($('.octolinker-link', helper(input, DEFAULT_REGEX, options)).data(), {
      value: 'undefined',
    });
  });

  it('can handle if value is null', () => {
    const { input } = createExpectation('foo <span><i>"</i>$0foo$0<i>"</i></span>');
    const options = { value: null };

    assert.deepEqual($('.octolinker-link', helper(input, DEFAULT_REGEX, options)).data(), {
      value: null,
    });
  });

  it('can handle if value is empty string', () => {
    const { input } = createExpectation('foo <span><i>"</i>$0foo$0<i>"</i></span>');
    const options = { value: '' };

    assert.deepEqual($('.octolinker-link', helper(input, DEFAULT_REGEX, options)).data(), {
      value: '',
    });
  });

  it('wraps the second regex match', () => {
    const options = { value: '$2', xx: 'yy' };
    const { input, output } = createExpectation('foo <i>"</i>bar<i>"</i> <i>"</i>$0baz$0<i>"</i>', options);
    const regex = /foo ("\w+") ("\w+")/;

    assert.equal(helper(input, regex, options, '$2').innerHTML, output.replace('$2', 'baz'));
  });

  it('does not remove closing parentheses from commented out require() calls', () => {
    const text = "// var faker = require('faker')";
    assert.equal(helper(text, REQUIRE).textContent, text);
  });
});
