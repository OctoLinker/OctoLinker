import assert from 'assert';
import javascriptUniversal from '../../lib/resolver/javascript-universal.js';

describe('javascript-universal', () => {
  it("resolves 'foo/bar.js' like 'foo'", () => {
    const type = 'npm';
    assert.deepEqual(
      javascriptUniversal({ type, target: 'foo/bar.js' }),
      javascriptUniversal({ type, target: 'foo' })
    );
  });
});
