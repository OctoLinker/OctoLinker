import assert from 'assert';
import fileType from './index.js';

describe('file-type', () => {
  describe('returns type "javascript" when', () => {
    it('is called with foo.js', () => {
      assert.equal(fileType('foo.js'), 'javascript');
    });

    it('is called with foo.es6', () => {
      assert.equal(fileType('foo.es6'), 'javascript');
    });

    it('is called with foo.jsx', () => {
      assert.equal(fileType('foo.jsx'), 'javascript');
    });

    it('is called with foo.coffee', () => {
      assert.equal(fileType('foo.coffee'), 'javascript');
    });
  });
});
