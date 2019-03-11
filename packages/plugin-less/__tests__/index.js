import assert from 'assert';
import Less from '../index';

describe('Less', () => {
  const path = '/octo/dog.less';
  const target = 'foo.less';

  it('resolves links', () => {
    assert.deepEqual(Less.resolve(path, [target]), [
      '{BASE_URL}/octo/foo.less',
      {
        path: '/octo/dog.less',
        target: 'foo.less',
        type: 'github-search',
      },
    ]);
  });
});
