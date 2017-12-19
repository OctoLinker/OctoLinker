import assert from 'assert';
import * as loadPlugins from '../lib/load-plugins.js';

describe('pattern-preset', () => {
  describe('githubClasses', () => {
    describe('highlight', () => {
      afterEach(() => {
        fixture.cleanup();
      });

      beforeEach(() => {
        fixture.load(
          '/packages/blob-reader/fixtures/github.com/issue/code.html',
        );
      });

      const presets = Object.values(loadPlugins).map(plugin =>
        plugin.getPattern(),
      );
      for (const [lang, value] of Object.entries(presets)) {
        value.githubClasses.forEach(className => {
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
});
