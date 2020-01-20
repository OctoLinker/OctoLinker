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
      [blob] = reader.read();
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

        expect(reader.read()[0].path).toBe(
          '/OctoLinker/testrepo/blob/9981d1a99ef8fff1f569c2ae24b136d5a0275132/sourcereader/popular-cat-names.js',
        );
      });

      it('when PR comment is up-to-date', () => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/pull/comments.html',
        );
        const reader = new BlobReader();

        expect(reader.read()[0].path).toBe(
          '/OctoLinker/testrepo/blob/64dc9c25b3e09d1d9af437e09d968d08ad5ec903/sourcereader/popular-cat-names.js',
        );
        expect(reader.read()[1].path).toBe(
          '/OctoLinker/testrepo/blob/64dc9c25b3e09d1d9af437e09d968d08ad5ec903/sourcereader/popular-cat-names.js',
        );
      });

      it('when PR comment is outdated', () => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/pull/comments.html',
        );
        const reader = new BlobReader();

        expect(reader.read()[2].path).toBe(
          '/OctoLinker/testrepo/blob/cc14b0ce8b94b7044f8c5d2d7af656270330bca2/sourcereader/popular-rabbit-names.js',
        );
        expect(reader.read()[3].path).toBe(
          '/OctoLinker/testrepo/blob/cc14b0ce8b94b7044f8c5d2d7af656270330bca2/sourcereader/popular-rabbit-names.js',
        );
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
      [blob] = reader.read();
    });

    it('sets type to full', () => {
      expect(blob.type).toBe('full');
    });

    it('sets isDiff indicator to false', () => {
      expect(blob.isDiff).toBe(false);
    });

    it('internals', () => {
      expect(Array.isArray(blob.lines)).toBe(true);
      expect(blob.lines).toHaveLength(4);
      expect(blob.lines).toMatchSnapshot();
      expect(blob.firstLineNumber).toBe(1);
      expect(blob.el).toBeDefined();
    });

    it('lineSelector()', () => {
      expect(blob.lineSelector(123)).toBe('#LC123');
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

    describe('fetchBlob', () => {
      it('fetch raw blob and update blob.lines property', async () => {
        fetch.mockResponseOnce(
          `// Most popular rabbit names\n\nThumper\nDaisy`,
        );

        await blob.fetchBlob();
        expect(fetch.mock.calls[0][0]).toBe(
          'https://raw.githubusercontent.com/OctoLinker/testrepo/89f13651df126efdb4f1e3ae40183c9fdccdb4d3/sourcereader/popular-rabbit-names.js',
        );

        expect(blob.lines).toMatchSnapshot();
        expect(blob.firstLineNumber).toBe(1);
      });

      it('when request fails set lines property to empty array', async () => {
        fetch.mockResponseOnce('Not Found', { status: 404 });

        await blob.fetchBlob();
        expect(fetch.mock.calls[0][0]).toBe(
          'https://raw.githubusercontent.com/OctoLinker/testrepo/89f13651df126efdb4f1e3ae40183c9fdccdb4d3/sourcereader/popular-rabbit-names.js',
        );
        expect(blob.lines).toStrictEqual([]);
      });
    });
  });

  describe('diff', () => {
    describe.each([
      [
        'split',
        '/packages/blob-reader/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_split.html',
      ],
      [
        'unified',
        '/packages/blob-reader/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_unified.html',
      ],
    ])('%s', (type, fixtureUrl) => {
      let blobLeft;
      let blobRight;

      beforeEach(() => {
        fixture.load(fixtureUrl);
        const reader = new BlobReader();
        [blobLeft, blobRight] = reader.read();
      });

      describe('left', () => {
        it('sets isDiff indicator to true', () => {
          expect(blobLeft.isDiff).toBe(true);
        });

        it('sets type to diffLeft', () => {
          expect(blobLeft.type).toBe('diffLeft');
        });

        it('internals', () => {
          expect(blobLeft.firstLineNumber).toBe(1);
          expect(blobLeft.lines).toMatchSnapshot();
        });

        it('lineSelector()', () => {
          expect(blobLeft.lineSelector(123)).toBe(
            `[id$='L123'][data-line-number='123']`,
          );
        });

        it('toString()', () => {
          expect(blobLeft.toString()).toMatchSnapshot();
        });
      });

      describe('right', () => {
        it('sets isDiff indicator to true', () => {
          expect(blobRight.isDiff).toBe(true);
        });

        it('sets type to diffRight', () => {
          expect(blobRight.type).toBe('diffRight');
        });

        it('internals', () => {
          expect(blobRight.firstLineNumber).toBe(1);
          expect(blobRight.lines).toMatchSnapshot();
        });

        it('lineSelector()', () => {
          expect(blobRight.lineSelector(123)).toBe(
            `[id$='R123'][data-line-number='123']`,
          );
        });

        it('toString()', () => {
          expect(blobRight.toString()).toMatchSnapshot();
        });
      });
    });
  });

  describe('gist', () => {
    let blob;

    beforeEach(() => {
      fixture.load(
        '/packages/blob-reader/fixtures/github.com/gist/cbc01d87dca84a6e0b118b73a2d49927.html',
      );
      const reader = new BlobReader();
      [blob] = reader.read();
    });

    it('contains blob path', () => {
      expect(blob.path).toBe('/dogs.json');
    });

    it('sets isDiff indicator to false', () => {
      expect(blob.isDiff).toBe(false);
    });

    it('sets type to gist', () => {
      expect(blob.type).toBe('gist');
    });

    it('lineSelector()', () => {
      expect(blob.lineSelector(123)).toBe(`[id$='LC123']`);
    });

    it('internals', () => {
      expect(blob.firstLineNumber).toBe(1);
      expect(blob.lines).toMatchSnapshot();
    });
  });

  describe('issue', () => {
    let blob;

    beforeEach(() => {
      fixture.load('/packages/blob-reader/fixtures/github.com/issue/code.html');
      const reader = new BlobReader();
      [blob] = reader.read();
    });

    it('sets type to snippet', () => {
      expect(blob.type).toBe('snippet');
    });

    it('sets isDiff indicator to false', () => {
      expect(blob.isDiff).toBe(false);
    });

    it('contains blob root element', () => {
      expect(blob.el).toBeDefined();
    });

    it('internals', () => {
      expect(blob.firstLineNumber).toBe(1);
      expect(blob.lines).toMatchSnapshot();
    });

    it('does not contain path', () => {
      expect(blob.path).toBeUndefined();
    });

    it('lineSelector()', () => {
      expect(blob.lineSelector(123)).toBe(`pre`);
    });
  });
});
