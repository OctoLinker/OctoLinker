import ghShorthand from 'github-url-from-username-repo';
import giturl from 'giturl';
import { VIM_PLUGIN } from '../../packages/helper-grammar-regex-collection/index.js';

export default {
  name: 'Vim',

  resolve({ target }) {
    // Logic adapted from https://github.com/VundleVim/Vundle.vim/blob/11fdc428fe741f4f6974624ad76ab7c2b503b73e/doc/vundle.txt#L196
    const components = target.split('/');

    // GitHub is used when a user/repo is passed to `Plugin`.
    if (components.length === 2) {
      return ghShorthand(target, true);
    }
    // Any single word without a slash '/' is assumed to be from Vim Scripts.
    if (components.length === 1) {
      return ghShorthand(`vim-scripts/${target}`, true);
    }
    // Assume it's a URL otherwise. We can't link to git/ssh, so change to https
    // and hope it works.
    return giturl.parse(target);
  },

  getPattern() {
    return {
      pathPatterns: [
        '.vimrc$',
        '.gvimrc$',
        '.vim$',
        // Sometimes there's no leading dot in .vimrc and .gvimrc, for example:
        // https://github.com/gmarik/vimfiles/blob/1f4f26d42f54443f1158e0009746a56b9a28b053/vimrc#L136
        '/vimrc$',
        '/gvimrc$',
      ],
      githubClasses: ['type-viml', 'highlight-source-viml'],
    };
  },

  getLinkRegexes() {
    return VIM_PLUGIN;
  },
};
