import assert from 'assert';
import dotNet from '../index';

describe('dotNet', () => {
  const path = '/blob/path/dummy';

  it('resolves EntityFramework to https://www.nuget.org/packages/EntityFramework', () => {
    assert.deepEqual(dotNet.resolve(path, ['EntityFramework']), [
      'https://www.nuget.org/packages/EntityFramework',
    ]);
  });

  it('resolves Stanford.NLP.CoreNLP to https://www.nuget.org/packages/Stanford.NLP.CoreNLP', () => {
    assert.deepEqual(dotNet.resolve(path, ['Stanford.NLP.CoreNLP']), [
      'https://www.nuget.org/packages/Stanford.NLP.CoreNLP',
    ]);
  });
});
