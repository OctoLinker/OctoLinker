import assert from 'assert';
import patternPresets from '../lib/pattern-preset.js';

describe('pattern-preset', () => {
  it('returns patterns for the given preset', () => {
    assert.deepEqual(patternPresets('JavaScript'), {
      pathSubstrings: [
        '.js',
        '.jsx',
        '.es6',
      ],
      githubClasses: [
        'type-javascript',
        'type-jsx',
      ],
    });
  });

  it('merges pattern for the given presets', () => {
    assert.deepEqual(patternPresets('JavaScript', 'CoffeeScript'), {
      pathSubstrings: ['.js', '.jsx', '.es6', '.coffee'],
      githubClasses: [
        'type-javascript',
        'type-jsx',
        'type-coffeescript',
      ],
    });
  });
});
