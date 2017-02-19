import assert from 'assert';
import BlobReader from './index.js';

describe('blob-reader', () => {
  afterEach(() => {
    fixture.cleanup();
  });

  describe('returned values object', () => {
    let result;

    beforeEach(() => {
      fixture.load('/packages/blob-reader/fixtures/github.com/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3.html');
      const reader = new BlobReader();
      result = reader.read()._blobs[0];
    });

    describe('contains blob path', () => {
      it('contains blob path', () => {
        assert.equal(result.path, '/OctoLinker/testrepo/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3/sourcereader/popular-rabbit-names.js');
      });

      it('when blob is a PR diff', () => {
        fixture.load('/packages/blob-reader/fixtures/github.com/pull/diff.html');
        const reader = new BlobReader();

        assert.equal(reader.read()._blobs[0].path, '/OctoLinker/testrepo/blob/9981d1a99ef8fff1f569c2ae24b136d5a0275132/sourcereader/popular-cat-names.js');
      });

      it('when PR comment is up-to-date', () => {
        fixture.load('/packages/blob-reader/fixtures/github.com/pull/comments.html');
        const reader = new BlobReader();

        assert.equal(reader.read()._blobs[0].path, '/OctoLinker/testrepo/blob/64dc9c25b3e09d1d9af437e09d968d08ad5ec903/sourcereader/popular-cat-names.js');
      });

      it('when PR comment is outdated', () => {
        fixture.load('/packages/blob-reader/fixtures/github.com/pull/comments.html');
        const reader = new BlobReader();

        assert.equal(reader.read()._blobs[1].path, '/OctoLinker/testrepo/blob/cc14b0ce8b94b7044f8c5d2d7af656270330bca2/sourcereader/popular-rabbit-names.js');
      });
    });

    it('contains blob root element', () => {
      assert(result.el !== undefined);
    });

    it('contains lines', () => {
      assert(Array.isArray(result.lines));
      assert.equal(result.lines.length, 4);
    });

    describe('toString()', () => {
      it('returns a string representation of the blobs content', () => {
        result.lines = [
          { value: 'a' },
          { value: 'b' },
        ];
        assert.equal(result.toString(), 'a\nb');
      });
    });

    describe('toJSON()', () => {
      it('returns a JSON representation of the blobs content', () => {
        result.lines = [
          { value: '{' },
          { value: '"foo": "bar"' },
          { value: '}' },
        ];
        assert.deepEqual(result.toJSON(), {
          foo: 'bar',
        });
      });

      it('returns an empty object if JSON.parse fails', () => {
        result.lines = [
          { value: '{' },
          { value: 'invalid' },
          { value: '}' },
        ];
        assert.deepEqual(result.toJSON(), {});
      });
    });
  });

  describe('blob', () => {
    let result;

    beforeEach(() => {
      fixture.load('/packages/blob-reader/fixtures/github.com/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3.html');
      const reader = new BlobReader();
      result = reader.read()._blobs[0];
    });

    it('contains four lines', () => {
      assert.equal(result.lines.length, 4);
    });

    it('does not contain any diff meta information', () => {
      assert.equal(result.lines.filter(line => line.additions || line.deletions).length, 0);
    });

    it('1st line', () => {
      assert.equal(result.lines[0].lineNumber, 1);
      assert.equal(result.lines[0].value, '// Most popular rabbit names');
    });

    it('2nd line', () => {
      assert.equal(result.lines[1].lineNumber, 2);
      assert.equal(result.lines[1].value, '');
    });

    it('3rd line', () => {
      assert.equal(result.lines[2].lineNumber, 3);
      assert.equal(result.lines[2].value, 'Thumper');
    });

    it('4th line', () => {
      assert.equal(result.lines[3].lineNumber, 4);
      assert.equal(result.lines[3].value, 'Daisy');
    });
  });

  describe('diff', () => {
    describe('split', () => {
      let result;

      beforeEach(() => {
        fixture.load('/packages/blob-reader/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_split.html');
        const reader = new BlobReader();
        result = reader.read()._blobs[0];
      });

      it('1st line', () => {
        assert.equal(result.lines[0].lineNumber, 1);
        // Use .trim() because Firefox puts a leading space, but Chrome doesn't.
        assert.equal(result.lines[0].value.trim(), '// Most popular rabbit names');
      });

      it('additions', () => {
        const line = result.lines[6];

        assert.equal(line.lineNumber, 4);
        assert.equal(line.value, '+Mozart');
        assert.equal(line.addition, true);
      });

      it('deletions', () => {
        const line = result.lines[9];

        assert.equal(line.lineNumber, 5);
        assert.equal(line.value, '-Lily');
        assert.equal(line.deletion, true);
      });
    });

    describe('unified', () => {
      let result;

      beforeEach(() => {
        fixture.load('/packages/blob-reader/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_unified.html');
        const reader = new BlobReader();
        result = reader.read()._blobs[0];
      });

      it('contains four lines', () => {
        assert.equal(result.lines.length, 7);
      });

      it('1st line', () => {
        assert.equal(result.lines[0].lineNumber, 1);
        // Use .trim() because Firefox puts a leading space, but Chrome doesn't.
        assert.equal(result.lines[0].value.trim(), '// Most popular rabbit names');
      });

      it('additions', () => {
        const line = result.lines[3];

        assert.equal(line.lineNumber, 4);
        assert.equal(line.value, '+Mozart');
        assert.equal(line.addition, true);
      });

      it('deletions', () => {
        const line = result.lines[5];

        assert.equal(line.lineNumber, 5);
        assert.equal(line.value, '-Lily');
        assert.equal(line.deletion, true);
      });
    });
  });

  describe('gist', () => {
    let result;

    beforeEach(() => {
      fixture.load('/packages/blob-reader/fixtures/github.com/gist/113827963013e98c6196db51cd889c39.html');
      const reader = new BlobReader();
      result = reader.read()._blobs[0];
    });

    it('contains blob path', () => {
      assert.equal(result.path, 'package.json');
    });
  });

  describe('issue', () => {
    let result;

    beforeEach(() => {
      fixture.load('/packages/blob-reader/fixtures/github.com/issue/code.html');
      const reader = new BlobReader();
      result = reader.read()._blobs[0];
    });

    it('contains blob root element', () => {
      assert(result.el !== undefined);
    });

    it('contains lines', () => {
      assert(Array.isArray(result.lines));
      assert.equal(result.lines.length, 1);
      assert.deepEqual(result.lines, [
        {
          value: 'import os',
          lineNumber: 1,
        },
      ]);
    });

    it('does not contain path', () => {
      assert.equal(result.path, undefined);
    });
  });
});
