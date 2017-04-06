import assert from 'assert';
import Less from '../../lib/plugins/less';
import githubSearch from '../../lib/resolver/github-search.js';

describe('Less', () => {
  const path = '/octo/dog.less';
  const target = 'foo.less';

  it('resolves links', () => {
    assert.deepEqual(
      Less.resolve({ path, target }),
      [
        '{BASE_URL}/octo/foo.less',
        githubSearch({ path, target }).toString(),
      ],
    );
  });
});
