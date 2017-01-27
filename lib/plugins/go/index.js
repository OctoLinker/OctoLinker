import { go } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';
import preset from '../../pattern-preset';

export default class Go {

  getPattern() {
    return preset('Go');
  }

  parseBlob(blob) {
    go(blob.toString()).forEach((val) => {
      insertLink(blob.el, val, {
        resolver: 'goUniversal',
        target: '$1',
        path: blob.path,
      });
    });
  }
}
