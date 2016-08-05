import assert from 'assert';
import rustCrate from '../../lib/resolver/rust-crate.js';

describe('rust-crate', () => {
  it('resolves hamcrest using the live-resolver', () => {
    assert.deepEqual(
      rustCrate({ target: 'hamcrest' }),
      {
        url: 'https://githublinker.herokuapp.com/q/crates/hamcrest',
        method: 'GET',
      }
    );
  });
});
