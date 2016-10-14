import assert from 'assert';
import nugetUrl from '../../lib/resolver/nuget-url.js';

describe('nuget-url', () => {
  it('resolves Microsoft.NETCore.App to https://www.nuget.org/packages/Microsoft.NETCore.App', () => {
    assert.deepEqual(
      nugetUrl({ target: 'Microsoft.NETCore.App' }),
      ['https://www.nuget.org/packages/Microsoft.NETCore.App']
    );
  });

  it('resolves Microsoft.Extensions.Configuration.FileExtensions to https://www.nuget.org/packages/Microsoft.Extensions.Configuration.FileExtensions', () => {
    assert.deepEqual(
      nugetUrl({ target: 'Microsoft.Extensions.Configuration.FileExtensions' }),
      ['https://www.nuget.org/packages/Microsoft.Extensions.Configuration.FileExtensions']
    );
  });
});
