import assert from 'assert';
import Less from '../less';
import githubSearch from '../../resolver/github-search.js';

describe('Less', () => {
  const path = '/octo/dog.less';
  const target = 'foo.less';

  it('resolves links', () => {
    assert.deepEqual(Less.resolve({ path, target }), [
      '{BASE_URL}/octo/foo.less',
      githubSearch({ path, target }).toString(),
    ]);
  });
});
