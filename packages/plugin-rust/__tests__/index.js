import rustCrate from '../index';

describe('rust-crate', () => {
  const path = '/blob/path/dummy';

  it('resolves hamcrest using the live-resolver', () => {
    expect(rustCrate.resolve(path, ['hamcrest'])).toBe(
      'https://githublinker.herokuapp.com/q/crates/hamcrest',
    );
  });
});
