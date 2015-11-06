import assert from 'assert';
import $ from 'jquery';
import liveResolver from '../index.js';

function blobBuildHelper(lines) {
  return [
    {
      lines: lines.map(function(line) {
        const html = `<div>${line}</div>`;
        const el = $(html).get(0);
        return {
          text: $(html).text(),
          el,
        };
      }),
    },
  ];
}

describe('live-resolver', () => {
  it('wraps the keyword element with a link element', () => {
    const blob = blobBuildHelper(['id-<span>foo</span>']);
    liveResolver(blob, {
      regex: /id-(\w*)/g,
    });

    assert.equal(blob[0].lines[0].el.innerHTML, 'id-<a><span>foo</span></a>');
  });

  it('wraps the keyword element with a link element when keyworad is wrapped twice', () => {
    const blob = blobBuildHelper(['id-<span><span>foo</span></span>']);
    liveResolver(blob, {
      regex: /id-(\w*)/g,
    });

    assert.equal(blob[0].lines[0].el.innerHTML, 'id-<span><a><span>foo</span></a></span>');
  });

  it('wraps the keyword element with a link element when line is wrapped twice', () => {
    const blob = blobBuildHelper(['<span><span>id-</span><span>foo</span></span>']);
    liveResolver(blob, {
      regex: /id-(\w*)/g,
    });

    assert.equal(blob[0].lines[0].el.innerHTML, '<span><span>id-</span><a><span>foo</span></a></span>');
  });

  it('wraps all keyword elements with a link element', () => {
    const blob = blobBuildHelper(['id-<span><span>foo</span></span>id-<span><span>bar</span></span>']);
    liveResolver(blob, {
      regex: /id-([\w*])/g,
    });

    assert.equal(blob[0].lines[0].el.innerHTML, 'id-<span><a><span>foo</span></a></span>id-<span><a><span>bar</span></a></span>');
  });

  it('wraps only keyword elements with a link element', () => {
    const blob = blobBuildHelper(['id-<span><span>foo</span></span><span>foo</span>id-<span><span>foo</span></span>']);
    liveResolver(blob, {
      regex: /id-([\w*])/g,
    });

    assert.equal(blob[0].lines[0].el.innerHTML, 'id-<span><a><span>foo</span></a></span><span>foo</span>id-<span><a><span>foo</span></a></span>');
  });

  it('wraps each keyword elements with a link element', () => {
    const blob = blobBuildHelper([
      'id-<span>foo</span> data-<span>bar</span>',
      'id-<span>baz</span> data-<span>qux</span>',
    ]);
    liveResolver(blob, {
      regex: /id-(\w*) data-(\w*)/g,
    });

    assert.equal(blob[0].lines[0].el.innerHTML, 'id-<a><span>foo</span></a> data-<a><span>bar</span></a>');
    assert.equal(blob[0].lines[1].el.innerHTML, 'id-<a><span>baz</span></a> data-<a><span>qux</span></a>');
  });
});
