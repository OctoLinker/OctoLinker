import assert from 'assert';
import Java from '../index';

describe('Java', () => {
  const path = '/blob/path/dummy';

  it('resolves java core links', () => {
    assert.deepEqual(Java.resolve(path, ['java.util.Foo']), [
      `https://docs.oracle.com/javase/9/docs/api/java/util/Foo.html`,
      `https://docs.oracle.com/javaee/9/api/java/util/Foo.html`,
      `https://docs.oracle.com/javase/8/docs/api/java/util/Foo.html`,
      `https://docs.oracle.com/javaee/8/api/java/util/Foo.html`,
      `https://docs.oracle.com/javase/7/docs/api/java/util/Foo.html`,
      `https://docs.oracle.com/javaee/7/api/java/util/Foo.html`,
    ]);
  });

  it('resolves community packages', () => {
    expect(Java.resolve(path, ['com.company.app'])).toBe(
      'https://githublinker.herokuapp.com/q/java/com.company.app',
    );
  });
});
