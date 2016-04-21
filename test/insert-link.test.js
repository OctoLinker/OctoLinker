import assert from 'assert';
import $ from 'jquery';
import insertLink from '../lib/insert-link.js';

describe('helper-replace-keywords', () => {
  function helper(html, options = { value: '$1' }, regex = /foo ("\w+")/, replaceIndex = '$1') {
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

    const start = `<span class="octo-linker-link"${dataAttributes}>`;
    const input = el.replace(/\$0/g, '');
    const output = el.replace('$0', start).replace('$0', '</span>');

    return {
      input,
      output,
    };
  }

  function simpleAssert(el, dataAttr) {
    const { input, output } = createExpectation(el, dataAttr);

    assert.equal(helper(input).innerHTML, output);
  }

  it('wraps the elements based on their char position which is specified in the kewords map', () => {
    simpleAssert('foo <span><i>"</i>$0foo$0<i>"</i></span>', { value: 'foo' });
  });

  it('wraps the parent element when keyword is divided', () => {
    simpleAssert('foo $0<span><i>"</i><span>fo</span>o<i>"</i></span>$0', { value: 'foo' });
  });

  it('wraps a neasted element', () => {
    simpleAssert('foo <div><span><i>"</i>$0foo$0<i>"</i></span></div>', { value: 'foo' });
  });

  it('wraps the element once', () => {
    const { input } = createExpectation('foo <span><i>"</i>$0foo$0<i>"</i></span>', { value: 'foo' });
    assert.equal($('.octo-linker-link', helper(helper(input).innerHTML)).length, 1);
  });

  it('adds the given data-* attributes', () => {
    const { input } = createExpectation('foo <span><i>"</i>$0foo$0<i>"</i></span>');
    const options = { value: '$1', bar: 'baz' };

    assert.deepEqual($('.octo-linker-link', helper(input, options)).data(), {
      value: 'foo',
      bar: 'baz',
    });
  });

  it('wraps the second regex match', () => {
    const options = { value: '$2', xx: 'yy' };
    const { input, output } = createExpectation('foo <i>"</i>bar<i>"</i> <i>"</i>$0baz$0<i>"</i>', options);
    const regex = /foo ("\w+") ("\w+")/;

    assert.equal(helper(input, options, regex, '$2').innerHTML, output.replace('$2', 'baz'));
  });
});
