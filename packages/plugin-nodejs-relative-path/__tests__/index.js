import assert from 'assert';
import plugin from '../index';

describe('nodejs-relative-path', () => {
  it('resolves `__dirname + "/views"` relative to the current directory', () => {
    assert.deepEqual(
      plugin.resolve({
        target: '/views',
        path:
          '/pegjs/website/blob/5924ede36795192b77f2cb9bfe25a56e8e8b6f90/app.js#L12',
      }),
      '{BASE_URL}/pegjs/website/blob/5924ede36795192b77f2cb9bfe25a56e8e8b6f90/views',
    );
  });
});
