import assert from 'assert';
import python from '../../lib/plugins/python';
import liveResolverQuery from '../../lib/resolver/live-resolver-query.js';

describe('python', () => {
  const path = '/octo/dog.py';

  it('resolves local file', () => {
    assert.deepEqual(
      python.resolve({ path, target: '.foo' }),
      '{BASE_URL}/octo/foo.py',
    );
  });

  it('resolves init file', () => {
    assert.deepEqual(
      python.resolve({ path, target: '.' }),
      '{BASE_URL}/octo/__init__.py',
    );
  });

  it('resolves package', () => {
    assert.deepEqual(
      python.resolve({ path, target: 'foo' })[1],
      liveResolverQuery({ type: 'pypi', target: 'foo' }),
    );
  });

  it('resolves scope package', () => {
    assert.deepEqual(
      python.resolve({ path, target: 'foo.bar' })[1],
      liveResolverQuery({ type: 'pypi', target: 'foo' }),
    );
  });

  it('resolves buildin', () => {
    assert.deepEqual(
      python.resolve({ path, target: 'foo' })[0],
      'https://docs.python.org/3/library/foo.html',
    );
  });
});
