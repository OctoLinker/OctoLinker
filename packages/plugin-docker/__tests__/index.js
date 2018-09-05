import dockerImage from '../index';

describe('docker-image', () => {
  const path = '/blob/path/dummy';

  it('resolves foo to https://hub.docker.com/_/foo', () => {
    expect(dockerImage.resolve(path, ['foo'])).toEqual([
      '{BASE_URL}/blob/path/foo',
      'https://hub.docker.com/_/foo',
    ]);
  });

  it('resolves foo:1.2.3 to https://hub.docker.com/_/foo', () => {
    expect(dockerImage.resolve(path, ['foo:1.2.3'])).toEqual([
      '{BASE_URL}/blob/path/foo:1.2.3',
      'https://hub.docker.com/_/foo',
    ]);
  });

  it('resolves foo:1.2.3-alpha to https://hub.docker.com/_/foo', () => {
    expect(dockerImage.resolve(path, ['foo:1.2.3-alpha'])).toEqual([
      '{BASE_URL}/blob/path/foo:1.2.3-alpha',
      'https://hub.docker.com/_/foo',
    ]);
  });

  it('resolves foo/bar to https://hub.docker.com/r/foo/bar', () => {
    expect(dockerImage.resolve(path, ['foo/bar'])).toEqual([
      '{BASE_URL}/blob/path/foo/bar',
      'https://hub.docker.com/r/foo/bar',
    ]);
  });

  it('resolves foo/bar:1.2.3 to https://hub.docker.com/r/foo/bar', () => {
    expect(dockerImage.resolve(path, ['foo/bar:1.2.3'])).toEqual([
      '{BASE_URL}/blob/path/foo/bar:1.2.3',
      'https://hub.docker.com/r/foo/bar',
    ]);
  });

  it('resolves foobar.sh to "{BASE_URL}/blob/path/foobar.sh" ', () => {
    expect(dockerImage.resolve(path, ['foobar.sh'])).toEqual([
      '{BASE_URL}/blob/path/foobar.sh',
      'https://hub.docker.com/_/foobar.sh',
    ]);
  });
});
