import assert from 'assert';
import homebrew from '../../lib/plugins/homebrew-manifest';

describe('homebrew-file', () => {
  it('resolves a dependency of a homebrew-science formula to both homebrew-science and homebrew-core', () => {
    assert.deepEqual(
      homebrew.resolve({
        path: '/Homebrew/homebrew-science/blob/1acf4f470fc8c87f6bcbf19b721ebcd09c7fb025/octave.rb',
        target: 'autoconf.rb',
      }),
      [
        '{BASE_URL}/Homebrew/homebrew-science/blob/1acf4f470fc8c87f6bcbf19b721ebcd09c7fb025/autoconf.rb',
        'https://github.com/Homebrew/homebrew-core/blob/master/Formula/autoconf.rb',
      ],
    );
  });
});
