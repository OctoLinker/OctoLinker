import assert from 'assert';
import bulkUrls from './index.js';

describe('helper-bulk-url-builder', () => {
  function setup(value) {
    return bulkUrls({
      path: '/lib/index.js',
      value,
    });
  }

  it('./modules', function() {
    assert.deepEqual(setup('./modules'), [
      'https://github.com/lib/modules.js',
      'https://github.com/lib/modules/index.js',
      'https://github.com/lib/modules',
    ]);
  });

  it('../modules', function() {
    assert.deepEqual(setup('../modules'), [
      'https://github.com/modules.js',
      'https://github.com/modules/index.js',
      'https://github.com/modules',
    ]);
  });

  it('./modules.js', function() {
    assert.deepEqual(setup('./modules.js'), [
      'https://github.com/lib/modules.js',
      'https://github.com/lib/modules/index.js',
      'https://github.com/lib/modules',
    ]);
  });

  it('modules.js', function() {
    assert.deepEqual(setup('modules.js'), [
      'https://github.com/lib/modules.js',
      'https://github.com/lib/modules/index.js',
      'https://github.com/lib/modules',
    ]);
  });
});
