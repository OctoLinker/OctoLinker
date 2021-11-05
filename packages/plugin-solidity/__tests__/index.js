import assert from 'assert';
import Solidity from '../index';

describe('Solidity', () => {
  const path = '/octo/dog.sol';

  it('resolves link when target has a file extension', () => {
    assert.deepEqual(
      Solidity.resolve(path, ['./foo.sol']),
      '{BASE_URL}/octo/foo.sol',
    );
  });

  it("resolves 'foo/bar.sol' like 'foo'", () => {
    const type = 'npm';
    expect(Solidity.resolve(path, ['foo/bar.sol'], { type })).toEqual(
      Solidity.resolve(path, ['foo'], { type }),
    );
  });

  it("resolves '@openzeppelin/contracts/token/ERC721/ERC721.sol' to '@openzeppelin/contracts'", () => {
    const type = 'npm';
    expect(
      Solidity.resolve(
        path,
        ['@openzeppelin/contracts/token/ERC721/ERC721.sol'],
        { type },
      ),
    ).toEqual({
      registry: 'npm',
      target: '@openzeppelin/contracts',
    });
  });
});
