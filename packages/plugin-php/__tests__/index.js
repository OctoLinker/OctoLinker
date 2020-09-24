import { PHP_FUNC } from '@octolinker/helper-grammar-regex-collection';
import php from '../index';

describe('rust-crate', () => {
  const path = '/blob/path/dummy';

  it('resolves classes', () => {
    expect(php.resolve(path, ['FooBar'])).toEqual({
      registry: 'ping',
      target: 'https://www.php.net/manual/en/class.foobar.php',
    });
  });

  it('resolves functions', () => {
    expect(php.resolve(path, ['Foo_Bar'], {}, PHP_FUNC)).toEqual({
      registry: 'ping',
      target: 'https://www.php.net/manual/en/function.foo-bar.php',
    });
  });

  it('does not try to resolve packages', () => {
    expect(
      php.resolve(path, [
        'Illuminate\\Contracts\\Container\\BindingResolutionException',
      ]),
    ).toEqual(undefined);
  });
});
