import rustCrate from '../index';

describe('rust-crate', () => {
  const path = '/blob/path/dummy';

  it('resolves hamcrest using the live-resolver', () => {
    expect(rustCrate.resolve(path, ['hamcrest'])).toEqual({
      registry: 'crates',
      target: 'hamcrest',
    });
  });
});
