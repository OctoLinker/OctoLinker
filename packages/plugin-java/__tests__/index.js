import Java from '../index';

describe('Java', () => {
  const path = '/blob/path/dummy';

  it('resolves java standard libraries links', () => {
    expect(Java.resolve(path, ['java.util.Foo'])).toEqual({
      registry: 'java',
      target: 'java.util.Foo',
    });
  });

  it('resolves community packages', () => {
    expect(Java.resolve(path, ['com.company.app'])).toEqual({
      registry: 'java',
      target: 'com.company.app',
    });
  });
});
