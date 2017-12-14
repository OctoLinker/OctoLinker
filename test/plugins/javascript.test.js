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
      plugin.resolve({
        target: './modules/es6.symbol',
        path: '/user/repo/file.js',
      }),
      [
        '{BASE_URL}/user/repo/modules/es6.symbol.js',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.js',
        '{BASE_URL}/user/repo/modules/es6.symbol.jsx',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.jsx',
        '{BASE_URL}/user/repo/modules/es6.symbol.ts',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.ts',
        '{BASE_URL}/user/repo/modules/es6.symbol.tsx',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.tsx',
        '{BASE_URL}/user/repo/modules/es6.symbol.ls',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.ls',
        '{BASE_URL}/user/repo/modules/es6.symbol.json',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.json',
        '{BASE_URL}/user/repo/modules/es6.symbol',
      ],
    );
  });

  it("resolves './modules/es6.symbol.js' like './modules/es6.symbol'", () => {
    assert.deepEqual(
      plugin.resolve({
        target: './modules/es6.symbol.js',
        path: '/user/repo/file.js',
      }),
      [
        '{BASE_URL}/user/repo/modules/es6.symbol.js',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.js',
        '{BASE_URL}/user/repo/modules/es6.symbol.jsx',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.jsx',
        '{BASE_URL}/user/repo/modules/es6.symbol.ts',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.ts',
        '{BASE_URL}/user/repo/modules/es6.symbol.tsx',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.tsx',
        '{BASE_URL}/user/repo/modules/es6.symbol.ls',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.ls',
        '{BASE_URL}/user/repo/modules/es6.symbol.json',
        '{BASE_URL}/user/repo/modules/es6.symbol/index.json',
        '{BASE_URL}/user/repo/modules/es6.symbol',
      ],
    );
  });

  it("fallbacks './lib/foo.js' to './src/foo.js'", () => {
    assert.deepEqual(
      plugin.resolve({
        path: '/user/repo/package.json',
        target: './lib/foo.js',
      }),
      [
        '{BASE_URL}/user/repo/lib/foo.js',
        '{BASE_URL}/user/repo/src/foo.js',

        '{BASE_URL}/user/repo/lib/foo/index.js',
        '{BASE_URL}/user/repo/src/foo/index.js',

        '{BASE_URL}/user/repo/lib/foo.jsx',
        '{BASE_URL}/user/repo/src/foo.jsx',

        '{BASE_URL}/user/repo/lib/foo/index.jsx',
        '{BASE_URL}/user/repo/src/foo/index.jsx',

        '{BASE_URL}/user/repo/lib/foo.ts',
        '{BASE_URL}/user/repo/src/foo.ts',

        '{BASE_URL}/user/repo/lib/foo/index.ts',
        '{BASE_URL}/user/repo/src/foo/index.ts',

        '{BASE_URL}/user/repo/lib/foo.tsx',
        '{BASE_URL}/user/repo/src/foo.tsx',

        '{BASE_URL}/user/repo/lib/foo/index.tsx',
        '{BASE_URL}/user/repo/src/foo/index.tsx',

        '{BASE_URL}/user/repo/lib/foo.ls',
        '{BASE_URL}/user/repo/src/foo.ls',

        '{BASE_URL}/user/repo/lib/foo/index.ls',
        '{BASE_URL}/user/repo/src/foo/index.ls',

        '{BASE_URL}/user/repo/lib/foo.json',
        '{BASE_URL}/user/repo/src/foo.json',

        '{BASE_URL}/user/repo/lib/foo/index.json',
        '{BASE_URL}/user/repo/src/foo/index.json',

        '{BASE_URL}/user/repo/lib/foo',
        '{BASE_URL}/user/repo/src/foo',
      ],
    );
  });

  it("fallbacks './dist/foo.js' to './lib/foo.js' and './src/foo.js'", () => {
    assert.deepEqual(
      plugin.resolve({
        path: '/user/repo/package.json',
        target: './dist/foo.js',
      }),
      [
        '{BASE_URL}/user/repo/dist/foo.js',
        '{BASE_URL}/user/repo/lib/foo.js',
        '{BASE_URL}/user/repo/src/foo.js',

        '{BASE_URL}/user/repo/dist/foo/index.js',
        '{BASE_URL}/user/repo/lib/foo/index.js',
        '{BASE_URL}/user/repo/src/foo/index.js',

        '{BASE_URL}/user/repo/dist/foo.jsx',
        '{BASE_URL}/user/repo/lib/foo.jsx',
        '{BASE_URL}/user/repo/src/foo.jsx',

        '{BASE_URL}/user/repo/dist/foo/index.jsx',
        '{BASE_URL}/user/repo/lib/foo/index.jsx',
        '{BASE_URL}/user/repo/src/foo/index.jsx',

        '{BASE_URL}/user/repo/dist/foo.ts',
        '{BASE_URL}/user/repo/lib/foo.ts',
        '{BASE_URL}/user/repo/src/foo.ts',

        '{BASE_URL}/user/repo/dist/foo/index.ts',
        '{BASE_URL}/user/repo/lib/foo/index.ts',
        '{BASE_URL}/user/repo/src/foo/index.ts',

        '{BASE_URL}/user/repo/dist/foo.tsx',
        '{BASE_URL}/user/repo/lib/foo.tsx',
        '{BASE_URL}/user/repo/src/foo.tsx',

        '{BASE_URL}/user/repo/dist/foo/index.tsx',
        '{BASE_URL}/user/repo/lib/foo/index.tsx',
        '{BASE_URL}/user/repo/src/foo/index.tsx',

        '{BASE_URL}/user/repo/dist/foo.ls',
        '{BASE_URL}/user/repo/lib/foo.ls',
        '{BASE_URL}/user/repo/src/foo.ls',

        '{BASE_URL}/user/repo/dist/foo/index.ls',
        '{BASE_URL}/user/repo/lib/foo/index.ls',
        '{BASE_URL}/user/repo/src/foo/index.ls',

        '{BASE_URL}/user/repo/dist/foo.json',
        '{BASE_URL}/user/repo/lib/foo.json',
        '{BASE_URL}/user/repo/src/foo.json',

        '{BASE_URL}/user/repo/dist/foo/index.json',
        '{BASE_URL}/user/repo/lib/foo/index.json',
        '{BASE_URL}/user/repo/src/foo/index.json',

        '{BASE_URL}/user/repo/dist/foo',
        '{BASE_URL}/user/repo/lib/foo',
        '{BASE_URL}/user/repo/src/foo',
      ],
    );
  });
});
