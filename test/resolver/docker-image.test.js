import assert from 'assert';
import dockerImage from '../../lib/resolver/docker-image.js';

describe('docker-image', () => {
  it('resolves foo to https://hub.docker.com/_/foo', () => {
    assert.deepEqual(
      dockerImage({ image: 'foo' }),
      ['https://hub.docker.com/_/foo']
    );
  });

  it('resolves foo:1.2.3 to https://hub.docker.com/_/foo', () => {
    assert.deepEqual(
      dockerImage({ image: 'foo:1.2.3' }),
      ['https://hub.docker.com/_/foo']
    );
  });

  it('resolves foo:1.2.3-alpha to https://hub.docker.com/_/foo', () => {
    assert.deepEqual(
      dockerImage({ image: 'foo:1.2.3-alpha' }),
      ['https://hub.docker.com/_/foo']
    );
  });

  it('resolves foo/bar to https://hub.docker.com/r/foo/bar', () => {
    assert.deepEqual(
      dockerImage({ image: 'foo/bar' }),
      ['https://hub.docker.com/r/foo/bar']
    );
  });

  it('resolves foo/bar:1.2.3 to https://hub.docker.com/r/foo/bar', () => {
    assert.deepEqual(
      dockerImage({ image: 'foo/bar:1.2.3' }),
      ['https://hub.docker.com/r/foo/bar']
    );
  });
});
