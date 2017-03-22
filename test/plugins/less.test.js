import assert from 'assert';
import Less from '../../lib/plugins/less';

describe('Less', () => {
  const path = '/octo/dog.less';

  it('resolves links', () => {
    assert.deepEqual(
      Less.resolve({ path, target: 'foo.less' }),
      [
        '{BASE_URL}/octo/foo.less',
      ],
    );
  });
});
