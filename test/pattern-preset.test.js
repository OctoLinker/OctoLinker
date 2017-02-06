import assert from 'assert';
import patternPresets, { presets } from '../lib/pattern-preset.js';

describe('pattern-preset', () => {
  describe('githubClasses', () => {
    describe('highlight', () => {
      afterEach(() => {
        fixture.cleanup();
      });

      beforeEach(() => {
        fixture.load('/packages/blob-reader/fixtures/github.com/issue/code.html');
      });

      for (const [lang, value] of Object.entries(presets)) {
        value.githubClasses.forEach((className) => {
          if (!className.includes('highlight')) {
            return;
          }

          it(`Found ${className} for ${lang}`, () => {
            assert.equal(!!document.querySelector(`.${className}`), true);
          });
        });
      }
    });
  });

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
        'highlight-source-js',
      ],
    });
  });

  it('merges pattern for the given presets', () => {
    assert.deepEqual(patternPresets('JavaScript', 'CoffeeScript'), {
      pathSubstrings: ['.js', '.jsx', '.es6', '.coffee'],
      githubClasses: [
        'type-javascript',
        'type-jsx',
        'highlight-source-js',
        'type-coffeescript',
        'highlight-source-coffee',
      ],
    });
  });
});
