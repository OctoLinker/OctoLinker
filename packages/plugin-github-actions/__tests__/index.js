import assert from 'assert';
import GiHubActions from '../index';

describe('GiHubActions', () => {
  const target = 'foo/bar';

  it('resolves link when file is within .github/workflows', () => {
    assert.deepEqual(
      GiHubActions.resolve('/octo/cat/.github/workflows/dog.yml', [target]),
      '{BASE_URL}/foo/bar',
    );
  });

  it('does not resolves link when file is not within .github/workflows', () => {
    assert.deepEqual(
      GiHubActions.resolve('/octo/cat/.github/dog.yml', [target]),
      '',
    );
  });
});
