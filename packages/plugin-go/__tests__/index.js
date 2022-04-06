import liveResolverQuery from '@octolinker/resolver-live-query';
import goUniversal from '../index';

describe('go-universal', () => {
  const path = 'octo/dog.go';

  it('resolves local file', () => {
    expect(goUniversal.resolve(path, ['../foo'])).toEqual([
      '{BASE_URL}foo/foo.go',
      '{BASE_URL}foo.go',
      '{BASE_URL}foo',
    ]);
  });

  it('resolves package', () => {
    expect(goUniversal.resolve(path, ['foo'])).toEqual([
      'https://foo',
      'https://pkg.go.dev/foo',
      liveResolverQuery({ type: 'go', target: 'foo' }),
    ]);
  });

  it('resolves github shorthand', () => {
    expect(goUniversal.resolve(path, ['github.com/foo/bar'])).toEqual([
      '{BASE_URL}/foo/bar/blob/master/bar.go',
      '{BASE_URL}/foo/bar',
    ]);
  });

  it('resolves github deep link', () => {
    expect(goUniversal.resolve(path, ['github.com/foo/bar/baze'])).toEqual([
      '{BASE_URL}/foo/bar/blob/master/baze/baze.go',
      '{BASE_URL}/foo/bar/tree/master/baze',
      '{BASE_URL}/foo/bar',
    ]);
  });
});
