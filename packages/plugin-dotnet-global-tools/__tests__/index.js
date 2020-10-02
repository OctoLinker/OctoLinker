import dotNetGlobalTools from '../index';

describe('dotNetGlobalTools', () => {
  const path = '/blob/path/dummy';

  it('resolves dotnet-format to https://www.nuget.org/packages/dotnet-format', () => {
    expect(dotNetGlobalTools.resolve(path, ['dotnet-format'])).toEqual({
      target: 'https://www.nuget.org/packages/dotnet-format',
      type: 'trusted-url',
    });
  });
});
