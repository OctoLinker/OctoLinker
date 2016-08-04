import { VIM_PLUGIN } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';

export default class Vim {

  getPattern() {
    return [
      '.vimrc',
      '.gvimrc',
      '.vim',
      // Sometimes there's no leading dot in .vimrc and .gvimrc, for example:
      // https://github.com/gmarik/vimfiles/blob/1f4f26d42f54443f1158e0009746a56b9a28b053/vimrc#L136
      'vimrc',
      'gvimrc',
    ];
  }

  parseBlob(blob) {
    insertLink(blob.el, VIM_PLUGIN, {
      resolver: 'vimPlugin',
      shorthand: '$1',
    });
  }
}
