import assert from 'assert';
import dockerImage from '../index';

describe('docker-image', () => {
  const path = '/blob/path/dummy';

  it('resolves foo to https://hub.docker.com/_/foo', () => {
    assert.deepEqual(dockerImage.resolve(path, ['foo']), [
      '{BASE_URL}/blob/path/foo',
      'https://hub.docker.com/_/foo',
    ]);
  });

  it('resolves foo:1.2.3 to https://hub.docker.com/_/foo', () => {
    assert.deepEqual(dockerImage.resolve(path, ['foo:1.2.3']), [
      '{BASE_URL}/blob/path/foo:1.2.3',
      'https://hub.docker.com/_/foo',
    ]);
  });

  it('resolves foo:1.2.3-alpha to https://hub.docker.com/_/foo', () => {
    assert.deepEqual(dockerImage.resolve(path, ['foo:1.2.3-alpha']), [
      '{BASE_URL}/blob/path/foo:1.2.3-alpha',
      'https://hub.docker.com/_/foo',
    ]);
  });

  it('resolves foo/bar to https://hub.docker.com/r/foo/bar', () => {
    assert.deepEqual(dockerImage.resolve(path, ['foo/bar']), [
      '{BASE_URL}/blob/path/foo/bar',
      'https://hub.docker.com/r/foo/bar',
    ]);
  });

  it('resolves foo/bar:1.2.3 to https://hub.docker.com/r/foo/bar', () => {
    assert.deepEqual(dockerImage.resolve(path, ['foo/bar:1.2.3']), [
      '{BASE_URL}/blob/path/foo/bar:1.2.3',
      'https://hub.docker.com/r/foo/bar',
    ]);
  });

  it('resolves foobar.sh to "{BASE_URL}/blob/path/foobar.sh" ', () => {
    assert.deepEqual(dockerImage.resolve(path, ['foobar.sh']), [
      '{BASE_URL}/blob/path/foobar.sh',
      'https://hub.docker.com/_/foobar.sh',
    ]);
  });
});
