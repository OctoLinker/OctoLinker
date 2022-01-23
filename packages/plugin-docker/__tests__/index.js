import { DOCKER_ENTRYPOINT } from '@octolinker/helper-grammar-regex-collection';
import dockerImage from '../index';

describe('docker-image', () => {
  const path = '/blob/path/dummy';

  it('resolves foo to https://hub.docker.com/_/foo', () => {
    expect(dockerImage.resolve(path, ['foo'])).toEqual({
      target: 'https://hub.docker.com/_/foo',
      type: 'trusted-url',
    });
  });

  it('resolves foo:1.2.3 to https://hub.docker.com/_/foo', () => {
    expect(dockerImage.resolve(path, ['foo:1.2.3'])).toEqual({
      target: 'https://hub.docker.com/_/foo',
      type: 'trusted-url',
    });
  });

  it('resolves foo:1.2.3-alpha to https://hub.docker.com/_/foo', () => {
    expect(dockerImage.resolve(path, ['foo:1.2.3-alpha'])).toEqual({
      target: 'https://hub.docker.com/_/foo',
      type: 'trusted-url',
    });
  });

  it('resolves foo/bar to https://hub.docker.com/r/foo/bar', () => {
    expect(dockerImage.resolve(path, ['foo/bar'])).toEqual({
      target: 'https://hub.docker.com/r/foo/bar',
      type: 'trusted-url',
    });
  });

  it('resolves foo/bar:1.2.3 to https://hub.docker.com/r/foo/bar', () => {
    expect(dockerImage.resolve(path, ['foo/bar:1.2.3'])).toEqual({
      target: 'https://hub.docker.com/r/foo/bar',
      type: 'trusted-url',
    });
  });

  it('resolves foobar.sh to "{BASE_URL}/blob/path/foobar.sh" ', () => {
    expect(
      dockerImage.resolve(path, ['foobar.sh'], {}, DOCKER_ENTRYPOINT),
    ).toEqual('{BASE_URL}/blob/path/foobar.sh');
  });
});
