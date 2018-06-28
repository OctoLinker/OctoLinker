import assert from 'assert';
import goUniversal from '../index';

describe('go-universal', () => {
  const path = 'octo/dog.go';

  it('resolves local file', () => {
    assert.deepEqual(goUniversal.resolve(path, ['../foo']), [
      '{BASE_URL}foo/foo.go',
      '{BASE_URL}foo.go',
      '{BASE_URL}foo',
    ]);
  });

  it('resolves package', () => {
    assert.deepEqual(goUniversal.resolve(path, ['foo']), [
      'https://foo',
      'https://golang.org/pkg/foo',
    ]);
  });

  it('resolves github shorthand', () => {
    assert.deepEqual(goUniversal.resolve(path, ['github.com/foo/bar']), [
      '{BASE_URL}/foo/bar/blob/master/bar.go',
      '{BASE_URL}/foo/bar',
    ]);
  });

  it('resolves github deep link', () => {
    assert.deepEqual(goUniversal.resolve(path, ['github.com/foo/bar/baze']), [
      '{BASE_URL}/foo/bar/blob/master/baze/baze.go',
      '{BASE_URL}/foo/bar/tree/master/baze',
      '{BASE_URL}/foo/bar',
    ]);
  });

  it('resolves k8s.io links', () => {
    assert.deepEqual(goUniversal.resolve(path, ['k8s.io/foo/bar']), [
      '{BASE_URL}/kubernetes/foo/blob/master/bar/bar.go',
      '{BASE_URL}/kubernetes/foo/tree/master/bar',
      '{BASE_URL}/kubernetes/foo',
    ]);
  });
});
