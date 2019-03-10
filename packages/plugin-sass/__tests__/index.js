import assert from 'assert';
import Sass from '../index';

describe('Sass', () => {
  const path = '/octo/dog.scss';
  const target = 'foo';

  it('resolves link when target does not have a file extension', () => {
    assert.deepEqual(Sass.resolve(path, [target]), [
      '{BASE_URL}/octo/_foo.scss',
      '{BASE_URL}/octo/_foo.sass',
      {
        path: '/octo/dog.scss',
        target: '_foo.scss',
        type: 'github-search',
      },
      {
        path: '/octo/dog.scss',
        target: '_foo.sass',
        type: 'github-search',
      },
    ]);
  });

  it('resolves link when target has a file extension', () => {
    assert.deepEqual(Sass.resolve(path, ['foo.scss']), [
      '{BASE_URL}/octo/_foo.scss',
      '{BASE_URL}/octo/_foo.sass',
      {
        path: '/octo/dog.scss',
        target: '_foo.scss',
        type: 'github-search',
      },
      {
        path: '/octo/dog.scss',
        target: '_foo.sass',
        type: 'github-search',
      },
    ]);
  });
});
