import assert from 'assert';
import Sass from '../../lib/plugins/sass';

describe('Sass', () => {
  const path = '/octo/dog.scss';

  it('resolves link when target does not have a file extension', () => {
    assert.deepEqual(
      Sass.resolve({ path, target: 'foo' }),
      [
        '{BASE_URL}/octo/_foo.scss',
        '{BASE_URL}/octo/_foo.sass',
      ],
    );
  });

  it('resolves link when target has a file extension', () => {
    assert.deepEqual(
      Sass.resolve({ path, target: 'foo.scss' }),
      [
        '{BASE_URL}/octo/_foo.scss',
        '{BASE_URL}/octo/_foo.sass',
      ],
    );
  });
});
