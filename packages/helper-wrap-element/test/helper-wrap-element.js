import assert from 'assert';
import $ from 'jquery';
import insertLink from '../index.js';

describe('helper-wrap-element', () => {
  it('wraps the elements based on their char position which is specified in the kewords map', () => {
    const input = 'foo <span>foo</span> <span>foo</span>';
    const expected = 'foo <a class="octo-linker-link" data-value="foo"><span>foo</span></a> <a class="octo-linker-link" data-value="foo"><span>foo</span></a>';
    const keywords = {
      4: 'foo',
      8: 'foo',
    };

    const el = document.createElement('div');
    el.innerHTML = input;
    insertLink(el, keywords);
    assert.equal(el.innerHTML, expected);
  });

  it('wraps a neasted element', () => {
    const input = 'foo <div><span>foo</span></div>';
    const expected = 'foo <div><a class="octo-linker-link" data-value="foo"><span>foo</span></a></div>';
    const keywords = {
      4: 'foo',
    };

    const el = document.createElement('div');
    el.innerHTML = input;
    insertLink(el, keywords);
    assert.equal(el.innerHTML, expected);
  });

  it('wraps the element once', () => {
    const input = 'foo <span>foo</span>';
    const keywords = {
      4: 'foo',
    };

    const el = document.createElement('div');
    el.innerHTML = input;
    insertLink(el, keywords);
    insertLink(el, keywords);
    assert.equal($('.octo-linker-link', el).length, 1);
  });

  it('adds the css class for the debug mode', () => {
    const input = 'foo <span>foo</span>';
    const keywords = {
      4: 'foo',
    };

    const el = document.createElement('div');
    el.innerHTML = input;
    insertLink(el, keywords, {}, { debug: true });
    assert.equal($('.octo-linker-link--debug-mode', el).length, 1);
  });

  it('adds the given data ad data-* attributes', () => {
    const input = 'foo <span>foo</span>';
    const keywords = {
      4: 'foo',
    };

    const el = document.createElement('div');
    const data = {
      foo: 'bar',
    };
    el.innerHTML = input;
    insertLink(el, keywords, data);

    assert.equal($('.octo-linker-link', el).data('foo'), 'bar');
  });
});
