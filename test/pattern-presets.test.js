import assert from 'assert';
import patternPresets from '../lib/pattern-presets.js';

describe('pattern-presets', () => {
  it('returns patterns for the given preset', () => {
    assert.deepEqual(patternPresets('JavaScript'), [
      '.js',
      '.jsx',
      '.es6',
    ]);
  });
});
