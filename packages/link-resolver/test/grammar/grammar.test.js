import assert from 'assert';
import universal from '../../grammar/universal.js';
import requireFixture from './fixtures/require.js';
import importFixture from './fixtures/import.js';

describe('grammar', () => {
  describe('universal', () => {
    describe('require()', () => {
      requireFixture.forEach(([input, output = {}]) => {
        it(input, () => {
          assert.deepEqual(universal('JavaScript')(input), output);
        });
      });
    });

    describe('import', () => {
      importFixture.forEach(([input, output = {}]) => {
        it(input, () => {
          assert.deepEqual(universal('JavaScript')(input), output);
        });
      });
    });
  });
});
