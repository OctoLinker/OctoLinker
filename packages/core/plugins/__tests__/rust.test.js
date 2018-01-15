import assert from 'assert';
import rustCrate from '../rust';

describe('rust-crate', () => {
  it('resolves hamcrest using the live-resolver', () => {
    assert.deepEqual(rustCrate.resolve({ target: 'hamcrest' }), {
      url: 'https://githublinker.herokuapp.com/q/crates/hamcrest',
      method: 'GET',
    });
  });
});
