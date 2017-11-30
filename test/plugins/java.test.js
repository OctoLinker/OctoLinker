import assert from 'assert';
import Java from '../../lib/plugins/java';

describe('Java', () => {
  it('resolves java core links', () => {
    assert.deepEqual(Java.resolve({ target: 'java.util.Foo' }), [
      `https://docs.oracle.com/javase/9/docs/api/java/util/Foo.html`,
      `https://docs.oracle.com/javaee/9/api/java/util/Foo.html`,
      `https://docs.oracle.com/javase/8/docs/api/java/util/Foo.html`,
      `https://docs.oracle.com/javaee/8/api/java/util/Foo.html`,
      `https://docs.oracle.com/javase/7/docs/api/java/util/Foo.html`,
      `https://docs.oracle.com/javaee/7/api/java/util/Foo.html`,
    ]);
  });

  it('resolves community packages', () => {
    assert.deepEqual(Java.resolve({ target: 'com.company.app' }), {
      url: 'https://githublinker.herokuapp.com/q/java/com.company.app',
      method: 'GET',
    });
  });
});
