import dotNetCore from '../index';

describe('dotNetCore', () => {
  const path = '/blob/path/dummy';

  it('resolves Microsoft.NETCore.App to https://www.nuget.org/packages/Microsoft.NETCore.App', () => {
    expect(dotNetCore.resolve(path, ['Microsoft.NETCore.App'])).toBe(
      'https://www.nuget.org/packages/Microsoft.NETCore.App',
    );
  });

  it('resolves Microsoft.Extensions.Configuration.FileExtensions to https://www.nuget.org/packages/Microsoft.Extensions.Configuration.FileExtensions', () => {
    expect(
      dotNetCore.resolve(path, [
        'Microsoft.Extensions.Configuration.FileExtensions',
      ]),
    ).toBe(
      'https://www.nuget.org/packages/Microsoft.Extensions.Configuration.FileExtensions',
    );
  });
});
