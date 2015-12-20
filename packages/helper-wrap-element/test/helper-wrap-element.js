import assert from 'assert';
import insertLink from '../index.js';

describe('helper-wrap-element', () => {
  it('wraps the elements based on their char position which is specified in the kewords map', () => {
    const input = 'foo <span>foo</span> <span>foo</span>';
    const expected = 'foo <a class="octo-linker-item"><span>foo</span></a> <a class="octo-linker-item"><span>foo</span></a>';
    const keywords = {
      4: 'foo',
      8: 'foo',
    };

    const el = document.createElement('div');
    el.innerHTML = input;
    insertLink(el, keywords);
    assert.equal(el.innerHTML, expected);
  });

  it('wraps the element just once', () => {
    const input = 'foo <span>foo</span>';
    const expected = 'foo <a class="octo-linker-item"><span>foo</span></a>';
    const keywords = {
      4: 'foo',
      8: 'foo',
    };

    const el = document.createElement('div');
    el.innerHTML = input;
    insertLink(el, keywords);
    insertLink(el, keywords);
    assert.equal(el.innerHTML, expected);
  });

  it('adds the cssClass for the debug mode', () => {
    const input = 'foo <span>foo</span>';
    const expected = 'foo <a class="octo-linker-item octo-linker-item--debug-mode"><span>foo</span></a>';
    const keywords = {
      4: 'foo',
    };

    const el = document.createElement('div');
    el.innerHTML = input;
    insertLink(el, keywords, { debug: true });
    assert.equal(el.innerHTML, expected);
  });
});
