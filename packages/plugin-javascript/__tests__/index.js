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
    expect(plugin.resolve(path, ['@angular/core/bar.js'], { type })).toEqual({
      registry: 'npm',
      target: '@angular/core',
    });
  });

  it("resolves 'module' to 'https://nodejs.org/api/modules.html'", () => {
    expect(plugin.resolve(path, ['module'])).toEqual({
      target: 'https://nodejs.org/api/modules.html',
      type: 'trusted-url',
    });
  });

  it("resolves 'node:module' to 'https://nodejs.org/api/module.html'", () => {
    expect(plugin.resolve(path, ['node:module'])).toEqual({
      target: 'https://nodejs.org/api/modules.html',
      type: 'trusted-url',
    });
  });

  it("resolves 'https://example.org/foo.ts' to 'https://example.org/foo.ts'", () => {
    expect(plugin.resolve(path, ['https://example.org/foo.ts'])).toEqual({
      target: 'https://example.org/foo.ts',
      type: 'trusted-url',
    });
  });

  it("does not resolve 'https://example.org/'", () => {
    expect(plugin.resolve(path, ['https://example.org'])).toEqual({
      target: 'https://example.org',
      type: 'trusted-url',
    });
  });

  it("resolves 'https://example.org/foo.js' to 'https://example.org/foo.js'", () => {
    expect(plugin.resolve(path, ['https://example.org/foo.js'])).toEqual({
      target: 'https://example.org/foo.js',
      type: 'trusted-url',
    });
  });

  it("resolves './modules/es6.symbol' without stripping .symbol suffix", () => {
    expect(plugin.resolve(path, ['./modules/es6.symbol'])).toMatchSnapshot();
  });

  it("resolves './modules/es6.symbol.js' like './modules/es6.symbol'", () => {
    expect(plugin.resolve(path, ['./modules/es6.symbol.js'])).toMatchSnapshot();
  });

  it("fallbacks './lib/foo.js' to './src/foo.js'", () => {
    expect(
      plugin.resolve('/user/repo/package.json', ['./lib/foo.js']),
    ).toMatchSnapshot();
  });

  it('returns empty array if path is undefined', () => {
    expect(plugin.resolve(undefined, ['./lib/foo.js'])).toEqual([]);
  });

  it("fallbacks './dist/foo.js' to './lib/foo.js' and './src/foo.js'", () => {
    expect(
      plugin.resolve('/user/repo/package.json', ['./dist/foo.js']),
    ).toMatchSnapshot();
  });
});
