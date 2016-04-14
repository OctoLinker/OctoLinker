import assert from 'assert';
import patternPresets from '../lib/pattern-preset.js';

describe('pattern-preset', () => {
  it('returns patterns for the given preset', () => {
    assert.deepEqual(patternPresets('JavaScript'), [
      '.js',
      '.jsx',
      '.es6',
    ]);
  });
});
