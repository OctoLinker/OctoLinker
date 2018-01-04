import assert from 'assert';
import Sass from '../sass';
import githubSearch from '../../resolver/github-search.js';

describe('Sass', () => {
  const path = '/octo/dog.scss';
  const target = 'foo';

  it('resolves link when target does not have a file extension', () => {
    assert.deepEqual(Sass.resolve({ path, target }), [
      '{BASE_URL}/octo/_foo.scss',
      '{BASE_URL}/octo/_foo.sass',
      githubSearch({ path, target }).toString(),
      githubSearch({ path, target }).toString(),
    ]);
  });

  it('resolves link when target has a file extension', () => {
    assert.deepEqual(Sass.resolve({ path, target: 'foo.scss' }), [
      '{BASE_URL}/octo/_foo.scss',
      '{BASE_URL}/octo/_foo.sass',
      githubSearch({ path, target }).toString(),
      githubSearch({ path, target }).toString(),
    ]);
  });
});
