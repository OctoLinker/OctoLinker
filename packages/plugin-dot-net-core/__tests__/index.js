import assert from 'assert';
import dotNetCore from '../dot-net-core';

describe('dotNetCore', () => {
  it('resolves Microsoft.NETCore.App to https://www.nuget.org/packages/Microsoft.NETCore.App', () => {
    assert.deepEqual(dotNetCore.resolve({ target: 'Microsoft.NETCore.App' }), [
      'https://www.nuget.org/packages/Microsoft.NETCore.App',
    ]);
  });

  it('resolves Microsoft.Extensions.Configuration.FileExtensions to https://www.nuget.org/packages/Microsoft.Extensions.Configuration.FileExtensions', () => {
    assert.deepEqual(
      dotNetCore.resolve({
        target: 'Microsoft.Extensions.Configuration.FileExtensions',
      }),
      [
        'https://www.nuget.org/packages/Microsoft.Extensions.Configuration.FileExtensions',
      ],
    );
  });
});
