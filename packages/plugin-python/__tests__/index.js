import assert from 'assert';
import liveResolverQuery from '@octolinker/resolver-live-query';
import python from '../index';

describe('python', () => {
  const path = '/octo/dog.py';

  describe('local file', () => {
    it('import .foo', () => {
      assert.deepEqual(python.resolve(path, ['.foo']), [
        '{BASE_URL}/octo/foo.py',
        '{BASE_URL}/octo/foo/__init__.py',
      ]);
    });

    it('from .foo import bar', () => {
      assert.deepEqual(python.resolve(path, ['.foo', 'bar']), [
        '{BASE_URL}/octo/foo/bar.py',
        '{BASE_URL}/octo/foo.py',
        '{BASE_URL}/octo/foo/__init__.py',
      ]);
    });

    it('from .foo.bar import baz', () => {
      assert.deepEqual(python.resolve(path, ['.foo.bar', 'baz']), [
        '{BASE_URL}/octo/foo/bar/baz.py',
        '{BASE_URL}/octo/foo/bar.py',
        '{BASE_URL}/octo/foo/bar/__init__.py',
      ]);
    });

    it('from . import foo', () => {
      assert.deepEqual(python.resolve(path, ['.', 'foo']), [
        '{BASE_URL}/octo/foo.py',
        '{BASE_URL}/octo/foo/__init__.py',
      ]);
    });

    it('import foo.bar', () => {
      assert.deepEqual(
        python.resolve(path, ['foo.bar'])[0],
        '{BASE_URL}/octo/foo/bar.py',
      );
    });

    it('import .', () => {
      assert.deepEqual(
        python.resolve(path, ['.']),
        '{BASE_URL}/octo/__init__.py',
      );
    });
  });

  it('import foo', () => {
    assert.deepEqual(python.resolve(path, ['foo']), [
      '{BASE_URL}/octo/foo.py',
      'https://docs.python.org/3/library/foo.html',
      liveResolverQuery({ type: 'pypi', target: 'foo' }),
    ]);
  });

  it('import foo.bar', () => {
    assert.deepEqual(python.resolve(path, ['foo.bar']), [
      '{BASE_URL}/octo/foo/bar.py',
      'https://docs.python.org/3/library/foo.bar.html',
      liveResolverQuery({ type: 'pypi', target: 'foo' }),
    ]);
  });

  it('from foo.bar import baz', () => {
    assert.deepEqual(python.resolve(path, ['foo.bar', 'baz']), [
      '{BASE_URL}/octo/foo/bar/baz.py',
      '{BASE_URL}/octo/foo/bar/baz/__init__.py',
      '{BASE_URL}/octo/foo/bar.py',
      '{BASE_URL}/octo/foo/bar/__init__.py',
      'https://docs.python.org/3/library/foo.bar.html',
      liveResolverQuery({ type: 'pypi', target: 'foo' }),
    ]);
  });
});
