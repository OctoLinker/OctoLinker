import assert from 'assert';
import grammar from '../../grammar/javascript.js';
import requireFixture from './fixtures/javascript/require.js';
import importFixture from './fixtures/javascript/import.js';

describe('grammar', () => {
  describe('javascript', () => {
    describe('require()', () => {
      requireFixture.forEach(([input, output = {}]) => {
        it(input, () => {
          assert.deepEqual(grammar(input), output);
        });
      });
    });

    describe('import', () => {
      importFixture.forEach(([input, output = {}]) => {
        it(input, () => {
          assert.deepEqual(grammar(input), output);
        });
      });
    });
  });
});
