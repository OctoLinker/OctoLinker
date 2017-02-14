import { VIM_PLUGIN } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';
import preset from '../../pattern-preset';

export default class Vim {

  getPattern() {
    return preset('Vim');
  }

  parseBlob(blob) {
    insertLink(blob.el, VIM_PLUGIN, {
      resolver: 'vimPlugin',
      shorthand: '$1',
    });
  }
}
