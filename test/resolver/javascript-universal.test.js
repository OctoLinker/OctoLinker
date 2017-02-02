import assert from 'assert';
import javascriptUniversal from '../../lib/resolver/javascript-universal.js';

describe('javascript-universal', () => {
  it("resolves 'foo/bar.js' like 'foo'", () => {
    const type = 'npm';
    assert.deepEqual(
      javascriptUniversal({ type, target: 'foo/bar.js' }),
      javascriptUniversal({ type, target: 'foo' }),
    );
  });

  it("resolves '@angular/core/bar.js' to '@angular/core'", () => {
    const type = 'npm';
    assert.deepEqual(
      javascriptUniversal({ type, target: '@angular/core/bar.js' })[0],
      {
        url: 'https://githublinker.herokuapp.com/q/npm/@angular/core',
        method: 'GET',
      },
    );
  });

  it("resolves 'module' to 'https://nodejs.org/api/modules.html'", () => {
    assert.deepEqual(
      javascriptUniversal({ target: 'module' }),
      'https://nodejs.org/api/modules.html',
    );
  });

  it("resolves './modules/es6.symbol' without stripping .symbol suffix", () => {
    assert.deepEqual(
      javascriptUniversal({ target: './modules/es6.symbol' }),
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
      javascriptUniversal({ target: './modules/es6.symbol.js' }),
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
});
