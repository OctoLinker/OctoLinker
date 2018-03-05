import assert from 'assert';
import vimPlugin from '../index';

describe('vim-plugin', () => {
  const path = '/blob/path/dummy';

  it('resolves VundleVim/Vundle.vim to https://github.com/VundleVim/Vundle.vim', () => {
    assert.deepEqual(
      vimPlugin.resolve(path, ['VundleVim/Vundle.vim']),
      'https://github.com/VundleVim/Vundle.vim',
    );
  });

  it('resolves ctrlp.vim to https://github.com/vim-scripts/ctrlp.vim', () => {
    assert.deepEqual(
      vimPlugin.resolve(path, ['ctrlp.vim']),
      'https://github.com/vim-scripts/ctrlp.vim',
    );
  });

  it('resolves a git:// URL to https/http', () => {
    assert.deepEqual(
      vimPlugin.resolve(path, ['git://git.wincent.com/command-t.git']),
      'http://git.wincent.com/command-t',
    );
  });
});
