import assert from 'assert';
import dotNetProj from '../../lib/plugins/dot-net-proj';

describe('dotNetProj', () => {
  it('resolves EntityFramework to https://www.nuget.org/packages/EntityFramework', () => {
    assert.deepEqual(dotNetProj.resolve({ target: 'EntityFramework' }), [
      'https://www.nuget.org/packages/EntityFramework',
    ]);
  });

  it('resolves Microsoft.AspNetCore.Mvc to https://www.nuget.org/packages/EntityFramework', () => {
    assert.deepEqual(dotNetProj.resolve({ target: 'Microsoft.AspNetCore.Mvc' }), [
      'https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc',
    ]);
  });
});
