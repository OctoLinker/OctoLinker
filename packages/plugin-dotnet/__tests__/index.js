import dotNet from '../index';

describe('dotNet', () => {
  const path = '/blob/path/dummy';

  it('resolves EntityFramework to https://www.nuget.org/packages/EntityFramework', () => {
    expect(dotNet.resolve(path, ['EntityFramework'])).toEqual({
      target: 'https://www.nuget.org/packages/EntityFramework',
      type: 'trusted-url',
    });
  });

  it('resolves Stanford.NLP.CoreNLP to https://www.nuget.org/packages/Stanford.NLP.CoreNLP', () => {
    expect(dotNet.resolve(path, ['Stanford.NLP.CoreNLP'])).toEqual({
      target: 'https://www.nuget.org/packages/Stanford.NLP.CoreNLP',
      type: 'trusted-url',
    });
  });
});
