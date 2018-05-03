import assert from 'assert';
import { hoogleSearch } from '@octolinker/resolver-hoogle-search';
import Haskell from '../index';

describe('haskell', () => {
  it('resolves links - top level project', () => {
    const path = '/user/repo/blob/v0.1/src/Main.hs';
    const target = 'Foo.Bar';

    assert.deepEqual(Haskell.resolve(path, [target]), [
      '{BASE_URL}/user/repo/blob/v0.1/src/Foo/Bar.hs',
      '{BASE_URL}/user/repo/blob/v0.1/lib/Foo/Bar.hs',
      '{BASE_URL}/user/repo/blob/v0.1/app/Foo/Bar.hs',
      '{BASE_URL}/user/repo/blob/v0.1/test/Foo/Bar.hs',
      '{BASE_URL}/user/repo/blob/v0.1/Foo/Bar.hs',
      hoogleSearch({ target }).toString(),
    ]);
  });

  it('resolves links - monorepo project', () => {
    const path =
      '/user/repo/blob/v0.1/projects/project-in-monorepo/src/Main.hs';
    const target = 'Foo.Bar';

    assert.deepEqual(Haskell.resolve(path, [target]), [
      '{BASE_URL}/user/repo/blob/v0.1/projects/project-in-monorepo/src/Foo/Bar.hs',
      '{BASE_URL}/user/repo/blob/v0.1/projects/project-in-monorepo/lib/Foo/Bar.hs',
      '{BASE_URL}/user/repo/blob/v0.1/projects/project-in-monorepo/app/Foo/Bar.hs',
      '{BASE_URL}/user/repo/blob/v0.1/projects/project-in-monorepo/test/Foo/Bar.hs',
      '{BASE_URL}/user/repo/blob/v0.1/projects/project-in-monorepo/Foo/Bar.hs',
      hoogleSearch({ target }).toString(),
    ]);
  });
});
