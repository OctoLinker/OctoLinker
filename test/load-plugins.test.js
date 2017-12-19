import assert from 'assert';
import * as loadPlugins from '../lib/load-plugins.js';

describe('load-plugins', () => {
  it('returns an array of objects', () => {
    const plugins = Object.values(loadPlugins);

    assert(Array.isArray(plugins));

    plugins.forEach(plugin => {
      assert.equal(typeof plugin, 'object');
      assert(plugin.name);
      assert(plugin.resolve);
      assert(plugin.getPattern);
      assert(plugin.parseBlob || plugin.getLinkRegexes);
    });
  });
});
