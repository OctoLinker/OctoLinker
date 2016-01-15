import assert from 'assert';
import $ from 'jquery';
import insertLink from './index.js';

describe('helper-replace-keywords', () => {

  function helper(html) {
    const el = document.createElement('div');
    el.innerHTML = html;

    insertLink({
      el: el,
      path: '',
      type: '',
    }, [/foo ("\w+")/g]);

    return el;
  }

  function createExpectation(el, value = 'foo') {
    const start = `<span class="octo-linker-link" data-value="${value}" data-type="" data-path="">`;
    const input = el.replace(/\$0/g, '');
    const output = el.replace('$0', start).replace('$0', '</span>');

    return {
      input,
      output,
    };
  }

  function simpleAssert(el, ...args) {
    args.unshift(el);
    const { input, output } = createExpectation.apply(this, args);

    assert.equal(helper(input).innerHTML, output);
  }

  it('wraps the elements based on their char position which is specified in the kewords map', () => {
    simpleAssert('foo <span><i>"</i>$0foo$0<i>"</i></span>');
  });

  it('wraps the parent element when keyword is divided', () => {
    simpleAssert('foo $0<span><i>"</i><span>fo</span>o<i>"</i></span>$0');
  });

  it('wraps a neasted element', () => {
    simpleAssert('foo <div><span><i>"</i>$0foo$0<i>"</i></span></div>');
  });

  it('wraps the element once', () => {
    const { input } = createExpectation('foo <span><i>"</i>$0foo$0<i>"</i></span>');
    assert.equal($('.octo-linker-link', helper(helper(input).innerHTML)).length, 1);
  });

  it('adds the given data-* attributes', () => {
    const { output } = createExpectation('foo <span><i>"</i>$0foo$0<i>"</i></span>', 'bar');

    assert.deepEqual($('.octo-linker-link', helper(output)).data(), {
      path: '',
      type: '',
      value: 'bar',
    });
  });
});
