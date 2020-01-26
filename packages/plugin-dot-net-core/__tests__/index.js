import dotNetCore from '../index';

describe('dotNetCore', () => {
  const path = '/blob/path/dummy';

  it('resolves Microsoft.NETCore.App to https://www.nuget.org/packages/Microsoft.NETCore.App', () => {
    expect(dotNetCore.resolve(path, ['Microsoft.NETCore.App'])).toEqual({
      target: 'https://www.nuget.org/packages/Microsoft.NETCore.App',
      type: 'trusted-url',
    });
  });

  it('resolves Microsoft.Extensions.Configuration.FileExtensions to https://www.nuget.org/packages/Microsoft.Extensions.Configuration.FileExtensions', () => {
    expect(
      dotNetCore.resolve(path, [
        'Microsoft.Extensions.Configuration.FileExtensions',
      ]),
    ).toEqual({
      target:
        'https://www.nuget.org/packages/Microsoft.Extensions.Configuration.FileExtensions',
      type: 'trusted-url',
    });
  });
});
