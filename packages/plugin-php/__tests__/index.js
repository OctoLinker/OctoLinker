import php from '../index';

describe('rust-crate', () => {
  const path = '/blob/path/dummy';

  it('resolves php using the live-resolver', () => {
    expect(php.resolve(path, ['ArrayAccess'])).toEqual({
      registry: 'ping',
      target: 'https://www.php.net/manual/en/class.arrayaccess.php',
    });
  });
});
