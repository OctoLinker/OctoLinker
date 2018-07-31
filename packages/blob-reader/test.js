import BlobReader from './index.js';

describe('blob-reader', () => {
  afterEach(() => {
    fixture.cleanup();
  });

  describe('returned values object', () => {
    let result;

    beforeEach(() => {
      fixture.load(
        '/packages/blob-reader/fixtures/github.com/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3.html',
      );
      const reader = new BlobReader();
      [result] = reader.read()._blobs;
    });

    describe('contains blob path', () => {
      it('contains blob path', () => {
        expect(result.path).toBe(
          '/OctoLinker/testrepo/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3/sourcereader/popular-rabbit-names.js',
        );
      });

      it('when blob is a PR diff', () => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/pull/diff.html',
        );
        const reader = new BlobReader();

        expect(reader.read()._blobs[0].path).toBe(
          '/OctoLinker/testrepo/blob/9981d1a99ef8fff1f569c2ae24b136d5a0275132/sourcereader/popular-cat-names.js',
        );
      });

      it('when PR comment is up-to-date', () => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/pull/comments.html',
        );
        const reader = new BlobReader();

        expect(reader.read()._blobs[0].path).toBe(
          '/OctoLinker/testrepo/blob/64dc9c25b3e09d1d9af437e09d968d08ad5ec903/sourcereader/popular-cat-names.js',
        );
      });

      it('when PR comment is outdated', () => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/pull/comments.html',
        );
        const reader = new BlobReader();

        expect(reader.read()._blobs[1].path).toBe(
          '/OctoLinker/testrepo/blob/cc14b0ce8b94b7044f8c5d2d7af656270330bca2/sourcereader/popular-rabbit-names.js',
        );
      });
    });

    it('contains blob root element', () => {
      expect(result.el).toBeDefined();
    });

    it('contains lines', () => {
      expect(Array.isArray(result.lines)).toBe(true);
      expect(result.lines).toHaveLength(4);
    });

    describe('toString()', () => {
      it('returns a string representation of the blobs content', () => {
        result.lines = [{ value: 'a' }, { value: 'b' }];
        expect(result.toString()).toMatchSnapshot();
      });
    });

    describe('toJSON()', () => {
      it('returns a JSON representation of the blobs content', () => {
        result.lines = [
          { value: '{' },
          { value: '"foo": "bar"' },
          { value: '}' },
        ];
        expect(result.toJSON()).toMatchSnapshot();
      });

      it('returns an empty object if JSON.parse fails', () => {
        result.lines = [{ value: '{' }, { value: 'invalid' }, { value: '}' }];
        expect(result.toJSON()).toEqual({});
      });
    });
  });

  describe('blob', () => {
    let result;

    beforeEach(() => {
      fixture.load(
        '/packages/blob-reader/fixtures/github.com/blob/89f13651df126efdb4f1e3ae40183c9fdccdb4d3.html',
      );
      const reader = new BlobReader();
      [result] = reader.read()._blobs;
    });

    it('contains four lines', () => {
      expect(Array.isArray(result.lines)).toBe(true);
      expect(result.lines).toHaveLength(4);
    });

    it('does not contain any diff meta information', () => {
      expect(
        result.lines.filter(line => line.additions || line.deletions),
      ).toHaveLength(0);
    });

    it('1st line', () => {
      expect(result.lines[0]).toMatchSnapshot();
    });

    it('2nd line', () => {
      expect(result.lines[1]).toMatchSnapshot();
    });

    it('3rd line', () => {
      expect(result.lines[2]).toMatchSnapshot();
    });

    it('4th line', () => {
      expect(result.lines[3]).toMatchSnapshot();
    });
  });

  describe('diff', () => {
    describe('split', () => {
      let result;

      beforeEach(() => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_split.html',
        );
        const reader = new BlobReader();
        [result] = reader.read()._blobs;
      });

      it('1st line', () => {
        expect(result.lines[0]).toMatchSnapshot();
      });

      it('additions', () => {
        expect(result.lines[6]).toMatchSnapshot();
      });

      it('deletions', () => {
        expect(result.lines[9]).toMatchSnapshot();
      });
    });

    describe('unified', () => {
      let result;

      beforeEach(() => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/commit/b0775a93ea27ee381858ddd9fa2bb953d5b74acb_unified.html',
        );
        const reader = new BlobReader();
        [result] = reader.read()._blobs;
      });

      it('contains four lines', () => {
        expect(result.lines).toHaveLength(7);
      });

      it('1st line', () => {
        expect(result.lines[0]).toMatchSnapshot();
      });

      it('additions', () => {
        expect(result.lines[3]).toMatchSnapshot();
      });

      it('deletions', () => {
        expect(result.lines[5]).toMatchSnapshot();
      });
    });
  });

  describe('gist', () => {
    let result;

    beforeEach(() => {
      fixture.load(
        '/packages/blob-reader/fixtures/github.com/gist/113827963013e98c6196db51cd889c39.html',
      );
      const reader = new BlobReader();
      [result] = reader.read()._blobs;
    });

    it('contains blob path', () => {
      expect(result.path).toBe('package.json');
    });
  });

  describe('issue', () => {
    let result;

    beforeEach(() => {
      fixture.load('/packages/blob-reader/fixtures/github.com/issue/code.html');
      const reader = new BlobReader();
      [result] = reader.read()._blobs;
    });

    it('contains blob root element', () => {
      expect(result.el).toBeDefined();
    });

    it('contains lines', () => {
      expect(result.lines).toMatchSnapshot();
    });

    it('does not contain path', () => {
      expect(result.path).toBeUndefined();
    });
  });
});
