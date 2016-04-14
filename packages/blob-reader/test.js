import assert from 'assert';
import BlobReader from './index.js';

describe('blob-reader', () => {
  afterEach(() => {
    fixture.cleanup();
  });

  describe('returned values object', () => {
    let result;

    beforeEach(() => {
      fixture.load(__dirname + '/fixtures/github.com/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3.html');
      const reader = new BlobReader();
      reader.read().forEach((blob) => {
        result = blob;
      });
    });

    it('contains blob path', function () {
      assert.equal(result.path, '/octo-linker/testrepo/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3/sourcereader/popular-rabbit-names.js');
    });

    it('contains blob root element', function () {
      assert(result.el !== undefined);
    });

    it('contains lines', function () {
      assert(Array.isArray(result.lines));
      assert.equal(result.lines.length, 4);
    });

    describe('getText', function () {
      it('returns a string representation of the blobs content', function () {
        result.lines = [
          { value: 'a' },
          { value: 'b' },
        ];
        assert.equal(result.getText(), 'a\nb');
      });
    });

    describe('getJSON', function () {
      it('returns a JSON representation of the blobs content', function () {
        result.lines = [
          { value: '{' },
          { value: '"foo": "bar"' },
          { value: '}' },
        ];
        assert.deepEqual(result.getJSON(), {
          foo: 'bar',
        });
      });

      it('returns an empty object if JSON.parse fails', function () {
        result.lines = [
          { value: '{' },
          { value: 'invalid' },
          { value: '}' },
        ];
        assert.deepEqual(result.getJSON(), {});
      });
    });
  });

  describe('blob', function () {
    let result;

    beforeEach(() => {
      fixture.load(__dirname + '/fixtures/github.com/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3.html');
      const reader = new BlobReader();
      reader.read().forEach((blob) => {
        result = blob;
      });
    });

    it('contains four lines', function () {
      assert.equal(result.lines.length, 4);
    });

    it('does not contain any diff meta information', function () {
      assert.equal(result.lines.filter((line) => line.additions || line.deletions).length, 0);
    });

    it('1st line', function () {
      assert.equal(result.lines[0].lineNumber, 1);
      assert.equal(result.lines[0].value, '// Most popular rabbit names');
    });

    it('2nd line', function () {
      assert.equal(result.lines[1].lineNumber, 2);
      assert.equal(result.lines[1].value, '');
    });

    it('3rd line', function () {
      assert.equal(result.lines[2].lineNumber, 3);
      assert.equal(result.lines[2].value, 'Thumper');
    });

    it('4th line', function () {
      assert.equal(result.lines[3].lineNumber, 4);
      assert.equal(result.lines[3].value, 'Daisy');
    });
  });

  describe('diff', () => {
    describe('split', () => {
      let result;

      beforeEach(() => {
        fixture.load(__dirname + '/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_split.html');
        const reader = new BlobReader();
        reader.read().forEach((blob) => {
          result = blob;
        });
      });

      it('1st line', function () {
        assert.equal(result.lines[0].lineNumber, 1);
        assert.equal(result.lines[0].value, '// Most popular rabbit names');
      });

      it('additions', function () {
        const line = result.lines[6];

        assert.equal(line.lineNumber, 4);
        assert.equal(line.value, '+Mozart');
        assert.equal(line.addition, true);
      });

      it('deletions', function () {
        const line = result.lines[9];

        assert.equal(line.lineNumber, 5);
        assert.equal(line.value, '-Lily');
        assert.equal(line.deletion, true);
      });
    });

    describe('unified', () => {
      let result;

      beforeEach(() => {
        fixture.load(__dirname + '/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_unified.html');
        const reader = new BlobReader();
        reader.read().forEach((blob) => {
          result = blob;
        });
      });

      it('contains four lines', function () {
        assert.equal(result.lines.length, 7);
      });

      it('1st line', function () {
        assert.equal(result.lines[0].lineNumber, 1);
        assert.equal(result.lines[0].value, '// Most popular rabbit names');
      });

      it('additions', function () {
        const line = result.lines[3];

        assert.equal(line.lineNumber, 4);
        assert.equal(line.value, '+Mozart');
        assert.equal(line.addition, true);
      });

      it('deletions', function () {
        const line = result.lines[5];

        assert.equal(line.lineNumber, 5);
        assert.equal(line.value, '-Lily');
        assert.equal(line.deletion, true);
      });
    });
  });
});
