import assert from 'assert';
import rustCrate from '../index';

describe('rust-crate', () => {
  const path = '/blob/path/dummy';

  it('resolves hamcrest using the live-resolver', () => {
    assert.deepEqual(rustCrate.resolve(path, ['hamcrest']), {
      url: 'https://githublinker.herokuapp.com/q/crates/hamcrest',
      method: 'GET',
    });
  });
});
