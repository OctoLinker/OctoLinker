import assert from 'assert';
import { languageByFilePath } from './index.js';

describe('helper-file-type', () => {
  describe('returns type "JavaScript" when', () => {
    it('is called with foo.js', () => {
      assert.equal(languageByFilePath('foo.js'), 'JavaScript');
    });

    it('is called with foo.es6', () => {
      assert.equal(languageByFilePath('foo.es6'), 'JavaScript');
    });

    it('is called with foo.jsx', () => {
      assert.equal(languageByFilePath('foo.jsx'), 'JavaScript');
    });
  });

  describe('returns type "CoffeeScript" when', () => {
    it('is called with foo.coffee', () => {
      assert.equal(languageByFilePath('foo.coffee'), 'CoffeeScript');
    });
  });

  describe('returns type "TypeScript" when', () => {
    it('is called with foo.ts', () => {
      assert.equal(languageByFilePath('foo.ts'), 'TypeScript');
    });
  });
});
