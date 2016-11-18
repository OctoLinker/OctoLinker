import assert from 'assert';
import pythonUniversal from '../../lib/resolver/python-universal.js';
import liveResolverQuery from '../../lib/resolver/live-resolver-query.js';

describe('python-universal', () => {
  const path = '/octo/dog.py';

  it('resolves local file', () => {
    assert.deepEqual(
      pythonUniversal({ path, target: '.foo' }),
      '{BASE_URL}/octo/foo.py'
    );
  });

  it('resolves init file', () => {
    assert.deepEqual(
      pythonUniversal({ path, target: '.' }),
      '{BASE_URL}/octo/__init__.py'
    );
  });

  it('resolves package', () => {
    assert.deepEqual(
      pythonUniversal({ path, target: 'foo' })[1],
      liveResolverQuery({ type: 'pypi', target: 'foo' })
    );
  });

  it('resolves scope package', () => {
    assert.deepEqual(
      pythonUniversal({ path, target: 'foo.bar' })[1],
      liveResolverQuery({ type: 'pypi', target: 'foo' })
    );
  });

  it('resolves buildin', () => {
    assert.deepEqual(
      pythonUniversal({ path, target: 'foo' })[0],
      'https://docs.python.org/3/library/foo.html'
    );
  });
});
