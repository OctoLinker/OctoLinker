import plugin from '../index';

describe('javascript-universal', () => {
  const path = '/blob/path/dummy';

  it("resolves 'foo/bar.js' like 'foo'", () => {
    const type = 'npm';
    expect(plugin.resolve(path, ['foo/bar.js'], { type })).toEqual(
      plugin.resolve(path, ['foo'], { type }),
    );
  });

  it("resolves '@angular/core/bar.js' to '@angular/core'", () => {
    const type = 'npm';
    expect(plugin.resolve(path, ['@angular/core/bar.js'], { type })[0]).toBe(
      'https://githublinker.herokuapp.com/q/npm/@angular/core',
    );
  });

  it("resolves 'module' to 'https://nodejs.org/api/modules.html'", () => {
    expect(plugin.resolve(path, ['module'])).toBe(
      'https://nodejs.org/api/modules.html',
    );
  });

  it("resolves './modules/es6.symbol' without stripping .symbol suffix", () => {
    expect(plugin.resolve('', ['./modules/es6.symbol'])).toMatchSnapshot();
  });

  it("resolves './modules/es6.symbol.js' like './modules/es6.symbol'", () => {
    expect(plugin.resolve('', ['./modules/es6.symbol.js'])).toMatchSnapshot();
  });

  it("fallbacks './lib/foo.js' to './src/foo.js'", () => {
    expect(
      plugin.resolve('/user/repo/package.json', ['./lib/foo.js']),
    ).toMatchSnapshot();
  });

  it("fallbacks './dist/foo.js' to './lib/foo.js' and './src/foo.js'", () => {
    expect(
      plugin.resolve('/user/repo/package.json', ['./dist/foo.js']),
    ).toMatchSnapshot();
  });
});
