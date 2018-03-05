import assert from 'assert';
import githubSearch from '@octolinker/resolver-github-search';
import Less from '../index';

describe('Less', () => {
  const path = '/octo/dog.less';
  const target = 'foo.less';

  it('resolves links', () => {
    assert.deepEqual(Less.resolve(path, [target]), [
      '{BASE_URL}/octo/foo.less',
      githubSearch({ path, target }).toString(),
    ]);
  });
});
