import BlobReader from './index.js';
import Blob from './blob.js';

describe('blob-reader', () => {
  afterEach(() => {
    fixture.cleanup();
    fetch.resetMocks();
  });

  describe('returned values object', () => {
    let blob;

    beforeEach(() => {
      fixture.load(
        '/packages/blob-reader/fixtures/github.com/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3.html',
      );
      const reader = new BlobReader();
      [blob] = reader.read().getBlobs();
    });

    describe('contains blob path', () => {
      it('contains blob path', () => {
        expect(blob.path).toBe(
          '/OctoLinker/testrepo/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3/sourcereader/popular-rabbit-names.js',
        );
      });

      it('when blob is a PR diff', () => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/pull/diff.html',
        );
        const reader = new BlobReader();

        expect(reader.read().getBlobs()[0].path).toBe(
          '/OctoLinker/testrepo/blob/9981d1a99ef8fff1f569c2ae24b136d5a0275132/sourcereader/popular-cat-names.js',
        );
      });

      it('when PR comment is up-to-date', () => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/pull/comments.html',
        );
        const reader = new BlobReader();

        expect(reader.read().getBlobs()[0].path).toBe(
          '/OctoLinker/testrepo/blob/64dc9c25b3e09d1d9af437e09d968d08ad5ec903/sourcereader/popular-cat-names.js',
        );
      });

      it('when PR comment is outdated', () => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/pull/comments.html',
        );
        const reader = new BlobReader();

        expect(reader.read().getBlobs()[1].path).toBe(
          '/OctoLinker/testrepo/blob/cc14b0ce8b94b7044f8c5d2d7af656270330bca2/sourcereader/popular-rabbit-names.js',
        );
      });
    });

    it('contains blob root element', () => {
      expect(blob.el).toBeDefined();
    });

    it('contains lines', () => {
      expect(Array.isArray(blob.lines)).toBe(true);
      expect(blob.lines).toHaveLength(4);
    });

    describe('toString()', () => {
      it('returns a string representation of the blobs content', () => {
        blob.lines = [{ value: 'a' }, { value: 'b' }];
        expect(blob.toString()).toMatchSnapshot();
      });
    });

    describe('toJSON()', () => {
      it('returns a JSON representation of the blobs content', () => {
        blob.lines = [
          { value: '{' },
          { value: '"foo": "bar"' },
          { value: '}' },
        ];
        expect(blob.toJSON()).toMatchSnapshot();
      });

      it('returns an empty object if JSON.parse fails', () => {
        blob.lines = [{ value: '{' }, { value: 'invalid' }, { value: '}' }];
        expect(blob.toJSON()).toEqual({});
      });
    });
  });

  describe('blob', () => {
    let blob;

    beforeEach(() => {
      fixture.load(
        '/packages/blob-reader/fixtures/github.com/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3.html',
      );
      const reader = new BlobReader();
      [blob] = reader.read().getBlobs();
    });

    it('contains four lines', () => {
      expect(Array.isArray(blob.lines)).toBe(true);
      expect(blob.lines).toHaveLength(4);
    });

    it('does not contain any diff meta information', () => {
      expect(
        blob.lines.filter(line => line.addition || line.deletion),
      ).toHaveLength(0);
    });

    it('sets isDiff indicator to false', () => {
      expect(blob.isDiff).toBe(false);
    });

    it('1st line', () => {
      expect(blob.lines[0]).toMatchSnapshot();
    });

    it('2nd line', () => {
      expect(blob.lines[1]).toMatchSnapshot();
    });

    it('3rd line', () => {
      expect(blob.lines[2]).toMatchSnapshot();
    });

    it('4th line', () => {
      expect(blob.lines[3]).toMatchSnapshot();
    });

    describe('fetchBlob', () => {
      it('fetch raw blob and update blob.lines property', async () => {
        fetch.mockResponse(`// Most popular rabbit names\n\nThumper\nDaisy`);

        await blob.fetchBlob();
        expect(fetch.mock.calls[0][0]).toBe(
          'https://raw.githubusercontent.com/OctoLinker/testrepo/89f13651df126efdb4f1e3ae40183c9fdccdb4d3/sourcereader/popular-rabbit-names.js',
        );

        expect(blob.lines).toMatchSnapshot();
      });
    });
  });

  describe('diff', () => {
    describe('split', () => {
      let blob;

      beforeEach(() => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_split.html',
        );
        const reader = new BlobReader();
        [blob] = reader.read()._blobs;
      });

      it('sets isDiff indicator to true', () => {
        expect(blob.isDiff).toBe(true);
      });

      it('1st line', () => {
        expect(blob.lines[0]).toMatchSnapshot();
      });

      it('additions', () => {
        expect(blob.lines[6]).toMatchSnapshot();
      });

      it('deletions', () => {
        expect(blob.lines[9]).toMatchSnapshot();
      });
    });

    describe('unified', () => {
      let blob;

      beforeEach(() => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_unified.html',
        );
        const reader = new BlobReader();
        [blob] = reader.read().getBlobs();
      });

      it('sets isDiff indicator to true', () => {
        expect(blob.isDiff).toBe(true);
      });

      it('contains four lines', () => {
        expect(blob.lines).toHaveLength(7);
      });

      it('1st line', () => {
        expect(blob.lines[0]).toMatchSnapshot();
      });

      it('additions', () => {
        expect(blob.lines[3]).toMatchSnapshot();
      });

      it('deletions', () => {
        expect(blob.lines[5]).toMatchSnapshot();
      });
    });

    describe('fetchParentBlob', () => {
      let blob;

      beforeEach(() => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_unified.html',
        );
        const reader = new BlobReader();
        [blob] = reader.read().getBlobs();
      });

      it('fetch raw blob and update blob.lines property', async () => {
        fetch.mockResponse(
          `// Most popular rabbit names\n\nThumper\nDaisy\nLily`,
        );

        await blob.fetchParentBlob();

        expect(fetch.mock.calls[0][0]).toBe(
          'https://raw.githubusercontent.com/OctoLinker/testrepo/37d5cdd/sourcereader/popular-rabbit-names.js',
        );
        expect(blob.parent).toBeInstanceOf(Blob);
        expect(blob.parent.lines).toMatchSnapshot();
      });
    });
  });

  describe('gist', () => {
    let blob;

    beforeEach(() => {
      fixture.load(
        '/packages/blob-reader/fixtures/github.com/gist/113827963013e98c6196db51cd889c39.html',
      );
      const reader = new BlobReader();
      [blob] = reader.read().getBlobs();
    });

    it('contains blob path', () => {
      expect(blob.path).toBe('package.json');
    });
  });

  describe('issue', () => {
    let blob;

    beforeEach(() => {
      fixture.load('/packages/blob-reader/fixtures/github.com/issue/code.html');
      const reader = new BlobReader();
      [blob] = reader.read().getBlobs();
    });

    it('contains blob root element', () => {
      expect(blob.el).toBeDefined();
    });

    it('contains lines', () => {
      expect(blob.lines).toMatchSnapshot();
    });

    it('does not contain path', () => {
      expect(blob.path).toBeUndefined();
    });
  });
});
