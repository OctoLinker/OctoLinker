import assert from 'assert';
import vimPlugin from '../../lib/plugins/vim';

describe('vim-plugin', () => {
  it('resolves VundleVim/Vundle.vim to https://github.com/VundleVim/Vundle.vim', () => {
    assert.deepEqual(
      vimPlugin.resolve({ shorthand: 'VundleVim/Vundle.vim' }),
      'https://github.com/VundleVim/Vundle.vim',
    );
  });

  it('resolves ctrlp.vim to https://github.com/vim-scripts/ctrlp.vim', () => {
    assert.deepEqual(
      vimPlugin.resolve({ shorthand: 'ctrlp.vim' }),
      'https://github.com/vim-scripts/ctrlp.vim',
    );
  });

  it('resolves a git:// URL to https/http', () => {
    assert.deepEqual(
      vimPlugin.resolve({ shorthand: 'git://git.wincent.com/command-t.git' }),
      'http://git.wincent.com/command-t',
    );
  });
});
