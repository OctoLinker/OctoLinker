import dockerImage from '../index';

describe('docker-image', () => {
  const path = '/blob/path/dummy';

  it('resolves foo to https://hub.docker.com/_/foo', () => {
    expect(dockerImage.resolve(path, ['foo'])).toBe(
      'https://hub.docker.com/_/foo',
    );
  });

  it('resolves foo:1.2.3 to https://hub.docker.com/_/foo', () => {
    expect(dockerImage.resolve(path, ['foo:1.2.3'])).toBe(
      'https://hub.docker.com/_/foo',
    );
  });

  it('resolves foo:1.2.3-alpha to https://hub.docker.com/_/foo', () => {
    expect(dockerImage.resolve(path, ['foo:1.2.3-alpha'])).toBe(
      'https://hub.docker.com/_/foo',
    );
  });

  it('resolves foo/bar to https://hub.docker.com/r/foo/bar', () => {
    expect(dockerImage.resolve(path, ['foo/bar'])).toBe(
      'https://hub.docker.com/r/foo/bar',
    );
  });

  it('resolves foo/bar:1.2.3 to https://hub.docker.com/r/foo/bar', () => {
    expect(dockerImage.resolve(path, ['foo/bar:1.2.3'])).toBe(
      'https://hub.docker.com/r/foo/bar',
    );
  });
});
