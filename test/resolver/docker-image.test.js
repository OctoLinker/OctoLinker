import assert from 'assert';
import dockerImage from '../../lib/resolver/docker-image.js';

describe('docker-image', () => {
  it('resolves foo to https://hub.docker.com/_/foo', () => {
    assert.deepEqual(
      dockerImage({ image: 'foo' }),
      [
        {
          url: 'https://githublinker.herokuapp.com/ping?url=https://hub.docker.com/_/foo',
          method: 'GET',
        },
      ]
    );
  });

  it('resolves foo:1.2.3 to https://hub.docker.com/_/foo', () => {
    assert.deepEqual(
      dockerImage({ image: 'foo:1.2.3' }),
      [
        {
          url: 'https://githublinker.herokuapp.com/ping?url=https://hub.docker.com/_/foo',
          method: 'GET',
        },
      ]
    );
  });

  it('resolves foo:1.2.3-alpha to https://hub.docker.com/_/foo', () => {
    assert.deepEqual(
      dockerImage({ image: 'foo:1.2.3-alpha' }),
      [
        {
          url: 'https://githublinker.herokuapp.com/ping?url=https://hub.docker.com/_/foo',
          method: 'GET',
        },
      ]
    );
  });

  it('resolves foo/bar to https://hub.docker.com/r/foo/bar', () => {
    assert.deepEqual(
      dockerImage({ image: 'foo/bar' }),
      [
        {
          url: 'https://githublinker.herokuapp.com/ping?url=https://hub.docker.com/r/foo/bar',
          method: 'GET',
        },
      ]
    );
  });

  it('resolves foo/bar:1.2.3 to https://hub.docker.com/r/foo/bar', () => {
    assert.deepEqual(
      dockerImage({ image: 'foo/bar:1.2.3' }),
      [
        {
          url: 'https://githublinker.herokuapp.com/ping?url=https://hub.docker.com/r/foo/bar',
          method: 'GET',
        },
      ]
    );
  });
});
