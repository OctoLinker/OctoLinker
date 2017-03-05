import assert from 'assert';
import plugin from '../../lib/plugins/javascript.js';

describe('javascript-universal', () => {
  it("resolves 'foo/bar.js' like 'foo'", () => {
    const type = 'npm';
    assert.deepEqual(
      plugin.resolve({ type, target: 'foo/bar.js' }),
      plugin.resolve({ type, target: 'foo' }),
    );
  });

  it("resolves '@angular/core/bar.js' to '@angular/core'", () => {
    const type = 'npm';
    assert.deepEqual(
      plugin.resolve({ type, target: '@angular/core/bar.js' })[0],
      {
        url: 'https://githublinker.herokuapp.com/q/npm/@angular/core',
        method: 'GET',
      },
    );
  });

  it("resolves 'module' to 'https://nodejs.org/api/modules.html'", () => {
    assert.deepEqual(
      plugin.resolve({ target: 'module' }),
      'https://nodejs.org/api/modules.html',
    );
  });

  it("resolves './modules/es6.symbol' without stripping .symbol suffix", () => {
    assert.deepEqual(
      plugin.resolve({ target: './modules/es6.symbol' }),
      [
        '{BASE_URL}modules/es6.symbol.js',
        '{BASE_URL}modules/es6.symbol/index.js',
        '{BASE_URL}modules/es6.symbol.jsx',
        '{BASE_URL}modules/es6.symbol/index.jsx',
        '{BASE_URL}modules/es6.symbol.ts',
        '{BASE_URL}modules/es6.symbol/index.ts',
        '{BASE_URL}modules/es6.symbol.tsx',
        '{BASE_URL}modules/es6.symbol/index.tsx',
        '{BASE_URL}modules/es6.symbol.json',
        '{BASE_URL}modules/es6.symbol/index.json',
        '{BASE_URL}modules/es6.symbol',
      ],
    );
  });

  it("resolves './modules/es6.symbol.js' like './modules/es6.symbol'", () => {
    assert.deepEqual(
      plugin.resolve({ target: './modules/es6.symbol.js' }),
      [
        '{BASE_URL}modules/es6.symbol.js',
        '{BASE_URL}modules/es6.symbol/index.js',
        '{BASE_URL}modules/es6.symbol.jsx',
        '{BASE_URL}modules/es6.symbol/index.jsx',
        '{BASE_URL}modules/es6.symbol.ts',
        '{BASE_URL}modules/es6.symbol/index.ts',
        '{BASE_URL}modules/es6.symbol.tsx',
        '{BASE_URL}modules/es6.symbol/index.tsx',
        '{BASE_URL}modules/es6.symbol.json',
        '{BASE_URL}modules/es6.symbol/index.json',
        '{BASE_URL}modules/es6.symbol',
      ],
    );
  });

  it("fallbacks './lib/foo.js' to './src/foo.js'", () => {
    assert.deepEqual(
      plugin.resolve({ target: './lib/foo.js' }),
      [
        '{BASE_URL}lib/foo.js',
        '{BASE_URL}lib/foo/index.js',
        '{BASE_URL}lib/foo.jsx',
        '{BASE_URL}lib/foo/index.jsx',
        '{BASE_URL}lib/foo.ts',
        '{BASE_URL}lib/foo/index.ts',
        '{BASE_URL}lib/foo.tsx',
        '{BASE_URL}lib/foo/index.tsx',
        '{BASE_URL}lib/foo.json',
        '{BASE_URL}lib/foo/index.json',
        '{BASE_URL}lib/foo',

        '{BASE_URL}src/foo.js',
        '{BASE_URL}src/foo/index.js',
        '{BASE_URL}src/foo.jsx',
        '{BASE_URL}src/foo/index.jsx',
        '{BASE_URL}src/foo.ts',
        '{BASE_URL}src/foo/index.ts',
        '{BASE_URL}src/foo.tsx',
        '{BASE_URL}src/foo/index.tsx',
        '{BASE_URL}src/foo.json',
        '{BASE_URL}src/foo/index.json',
        '{BASE_URL}src/foo',
      ],
    );
  });

  it("fallbacks './dist/foo.js' to './lib/foo.js' and './src/foo.js'", () => {
    assert.deepEqual(
      plugin.resolve({ target: './dist/foo.js' }),
      [
        '{BASE_URL}dist/foo.js',
        '{BASE_URL}dist/foo/index.js',
        '{BASE_URL}dist/foo.jsx',
        '{BASE_URL}dist/foo/index.jsx',
        '{BASE_URL}dist/foo.ts',
        '{BASE_URL}dist/foo/index.ts',
        '{BASE_URL}dist/foo.tsx',
        '{BASE_URL}dist/foo/index.tsx',
        '{BASE_URL}dist/foo.json',
        '{BASE_URL}dist/foo/index.json',
        '{BASE_URL}dist/foo',

        '{BASE_URL}lib/foo.js',
        '{BASE_URL}lib/foo/index.js',
        '{BASE_URL}lib/foo.jsx',
        '{BASE_URL}lib/foo/index.jsx',
        '{BASE_URL}lib/foo.ts',
        '{BASE_URL}lib/foo/index.ts',
        '{BASE_URL}lib/foo.tsx',
        '{BASE_URL}lib/foo/index.tsx',
        '{BASE_URL}lib/foo.json',
        '{BASE_URL}lib/foo/index.json',
        '{BASE_URL}lib/foo',

        '{BASE_URL}src/foo.js',
        '{BASE_URL}src/foo/index.js',
        '{BASE_URL}src/foo.jsx',
        '{BASE_URL}src/foo/index.jsx',
        '{BASE_URL}src/foo.ts',
        '{BASE_URL}src/foo/index.ts',
        '{BASE_URL}src/foo.tsx',
        '{BASE_URL}src/foo/index.tsx',
        '{BASE_URL}src/foo.json',
        '{BASE_URL}src/foo/index.json',
        '{BASE_URL}src/foo',
      ],
    );
  });
});
