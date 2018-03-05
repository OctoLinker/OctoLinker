import assert from 'assert';
import dotNetCore from '../index';

describe('dotNetCore', () => {
  const path = '/blob/path/dummy';

  it('resolves Microsoft.NETCore.App to https://www.nuget.org/packages/Microsoft.NETCore.App', () => {
    assert.deepEqual(dotNetCore.resolve(path, ['Microsoft.NETCore.App']), [
      'https://www.nuget.org/packages/Microsoft.NETCore.App',
    ]);
  });

  it('resolves Microsoft.Extensions.Configuration.FileExtensions to https://www.nuget.org/packages/Microsoft.Extensions.Configuration.FileExtensions', () => {
    assert.deepEqual(
      dotNetCore.resolve(path, [
        'Microsoft.Extensions.Configuration.FileExtensions',
      ]),
      [
        'https://www.nuget.org/packages/Microsoft.Extensions.Configuration.FileExtensions',
      ],
    );
  });
});
