import assert from 'assert';
import loadPlugins from '../lib/load-plugins.js';

describe('load-plugins', () => {
  it('returns an array of functions', () => {
    const plugins = loadPlugins();

    assert(Array.isArray(plugins));

    plugins.forEach((func) => {
      assert.equal(typeof func, 'function');
    });
  });
});
