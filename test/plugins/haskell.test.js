import assert from 'assert';
import Haskell from '../../lib/plugins/haskell';

describe('haskell', () => {
  const path = '/user/repo/blob/d6/lib/plugins/javascript.js';

  it('resolves links', () => {
    assert.deepEqual(
      Haskell.resolve({ path, target: 'Foo.Bar' }),
      [
        '{BASE_URL}/user/repo/blob/master/src/Foo/Bar.hs',
        '{BASE_URL}/user/repo/blob/master/lib/Foo/Bar.hs',
        '{BASE_URL}/user/repo/blob/master/Foo/Bar.hs',
        'https://hackage.haskell.org/package/base/docs/Foo-Bar.html',
      ],
    );
  });
});
