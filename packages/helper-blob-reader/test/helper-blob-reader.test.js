import assert from 'assert';
import sourcecode from '../index.js';

describe('helper-blob-reader', () => {
  afterEach(() => {
    fixture.cleanup();
  });

  describe('blob', function() {
    it('blob', () => {
      fixture.load(__dirname + '/fixtures/github.com/blob/foo.js.html');
      const result = sourcecode('https://github.com/octo-linker/testrepo/blob/6d380ffc7e2ef681f7da6b525140b817f3cb553c/sourcereader/foo.js');

      assert.equal(result.length, 1);
      assert.equal(result[0].type, 'javascript');
      assert.equal(result[0].path, 'https://github.com/octo-linker/testrepo/blob/6d380ffc7e2ef681f7da6b525140b817f3cb553c/sourcereader/foo.js');
      assert.equal(result[0].lines.length, 2);
      assert.equal(result[0].lines[0].text, 'var foo = require(\'foo\');');
      assert.equal(result[0].lines[1].text, 'require(\'path\');');
    });
  });

  describe('diff', function() {
    describe('unified', function() {
      it('commit unified', () => {
        fixture.load(__dirname + '/fixtures/github.com/commit/unified.html');
        const result = sourcecode('https://github.com/octo-linker/testrepo/commit/6d380ffc7e2ef681f7da6b525140b817f3cb553c?diff=unified');

        assert.equal(result.length, 2);

        assert.equal(result[0].type, 'javascript');
        assert.equal(result[0].path, '/octo-linker/testrepo/blob/master/sourcereader/bar.js');
        assert.equal(result[0].lines.length, 2);
        assert.equal(result[0].lines[0].text, '@@ -0,0 +1 @@');
        assert.equal(result[0].lines[1].text, '+var bar = require(\'bar\');');

        assert.equal(result[1].type, 'javascript');
        assert.equal(result[1].path, '/octo-linker/testrepo/blob/master/sourcereader/foo.js');
        assert.equal(result[1].lines.length, 3);
        assert.equal(result[1].lines[0].text, '@@ -0,0 +1,2 @@');
        assert.equal(result[1].lines[1].text, '+var foo = require(\'foo\');');
        assert.equal(result[1].lines[2].text, '+require(\'path\');');
      });
    });

    describe('split', function() {
      it('commit split', () => {
        fixture.load(__dirname + '/fixtures/github.com/commit/split.html');
        const result = sourcecode('https://github.com/octo-linker/testrepo/commit/6d380ffc7e2ef681f7da6b525140b817f3cb553c?diff=split');

        assert.equal(result.length, 2);

        assert.equal(result[0].type, 'javascript');
        assert.equal(result[0].path, '/octo-linker/testrepo/blob/master/sourcereader/bar.js');
        assert.equal(result[0].lines.length, 2);
        assert.equal(result[0].lines[0].text, '@@ -0,0 +1 @@');
        assert.equal(result[0].lines[1].text, '+var bar = require(\'bar\');');

        assert.equal(result[1].type, 'javascript');
        assert.equal(result[1].path, '/octo-linker/testrepo/blob/master/sourcereader/foo.js');
        assert.equal(result[1].lines.length, 3);
        assert.equal(result[1].lines[0].text, '@@ -0,0 +1,2 @@');
        assert.equal(result[1].lines[1].text, '+var foo = require(\'foo\');');
        assert.equal(result[1].lines[2].text, '+require(\'path\');');
      });
    });
  });
});
