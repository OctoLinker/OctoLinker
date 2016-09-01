import assert from 'assert';
import relativeFile from '../../lib/resolver/relative-file.js';

describe('relative-file', () => {
  const path = '/octo/file.txt';

  it('resolves local file', () => {
    assert.deepEqual(
      relativeFile({ path, target: '/foo.txt' }),
      '{BASE_URL}/octo/foo.txt'
    );
  });
});
