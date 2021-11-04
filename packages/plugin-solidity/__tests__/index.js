import assert from 'assert';
import Solidity from '../index';

describe('Solidity', () => {
  const path = '/octo/dog.sol';

  it('resolves link when target has a file extension', () => {
    assert.deepEqual(
      Solidity.resolve(path, ['foo.sol']),
      '{BASE_URL}/octo/foo.sol',
    );
  });
});
