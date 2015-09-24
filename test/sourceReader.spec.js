import assert from 'assert';
import sourcecode from '../src/sourceReader/index.js';

// Is there a lib for that?
function stringifyHTMLElement(res) {
  res.forEach((item) => {
    item.lines.forEach((line) => {
      if (line.el && line.el instanceof HTMLElement) {
        line.el = line.el.outerHTML;
      }
    });
  });

  return res;
}

describe('sourceReader', () => {
  afterEach(() => {
    fixture.cleanup();
  });

  describe('soureReader.html', () => {
    beforeEach(() => {
      fixture.load('/test/fixtures/sourceReader.html');
    });

    it('gets blob from the current page', () => {
      const result = sourcecode('https://github.com/user/repo/blob/master/file');
      assert.equal(result.length, 1);
    });

    describe('result', () => {
      it('contains the blob type', () => {
        // const result = sourcecode('https://github.com/user/repo/blob/master/file');
        // assert.equal(result[0].type, 'foo');
      });

      it('contains the blob lines', () => {
        const result = sourcecode('https://github.com/user/repo/blob/master/file');
        assert.equal(result[0].lines.length, 1);
      });

      describe('line', () => {
        it('contains the text', () => {
          const result = sourcecode('https://github.com/user/repo/blob/master/file');

          assert.equal(result[0].lines[0].text, 'Hello from Foo');
        });

        it('contains the element', () => {
          const result = stringifyHTMLElement(sourcecode('https://github.com/user/repo/blob/master/file'));

          assert.equal(result[0].lines[0].el, '<div class="blob-code-inner"><span><span>Hello</span> from <span>Foo</span></span></div>');
        });
      });
    });
  });

  describe('get blob from', () => {
    it('commit split', () => {
      fixture.load('/test/fixtures/github.com/commit/split.html');
      const result = sourcecode('https://github.com/user/repo/commit/4a30c6606465e294d1ae1c9ca394ba03368928f7');
      // console.log(JSON.stringify(stringifyHTMLElement(result), null, 2));
      assert.equal(result.length, 1);
      // assert.equal(result[0].type, 'javascript');
      assert.equal(result[0].lines.length, 4);
      assert.equal(result[0].lines[0].text, '@@ -1 +1,2 @@');
      assert.equal(result[0].lines[1].text, ' require(\'foo\');');
      assert.equal(result[0].lines[2].text, ' require(\'foo\');');
      assert.equal(result[0].lines[3].text, '+const bar = require(\'bar\');');
    });

    it('commit unified', () => {
      fixture.load('/test/fixtures/github.com/commit/unified.html');
      const result = sourcecode('https://github.com/user/repo/commit/4a30c6606465e294d1ae1c9ca394ba03368928f7');
      assert.equal(result.length, 1);
      // assert.equal(result[0].type, 'javascript');
      assert.equal(result[0].lines.length, 3);
      assert.equal(result[0].lines[0].text, '@@ -1 +1,2 @@');
      assert.equal(result[0].lines[1].text, ' require(\'foo\');');
      assert.equal(result[0].lines[2].text, '+const bar = require(\'bar\');');
    });

    it('blob', () => {
      fixture.load('/test/fixtures/github.com/blob/require.html');
      const result = sourcecode('https://github.com/user/repo/blob/master/file');

      assert.equal(result.length, 1);
      // assert.equal(result[0].type, 'javascript');
      assert.equal(result[0].lines.length, 2);
      assert.equal(result[0].lines[0].text, 'require(\'foo\');');
      assert.equal(result[0].lines[1].text, 'const bar = require(\'bar\');');
    });

    it('search', () => {
      fixture.load('/test/fixtures/github.com/search/foo.html');
      const result = sourcecode('https://github.com/user/repo/search?utf8=✓&q=foo');

      assert.equal(result.length, 1);
      // assert.equal(result[0].type, 'javascript');
      assert.equal(result[0].lines.length, 1);
      assert.equal(result[0].lines[0].text, 'require(\'foo\');');
    });
  });
});
