import { PYTHON_IMPORT } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';
import preset from '../../pattern-preset';

export default class Python {

  getPattern() {
    return preset('Python');
  }

  parseBlob(blob) {
    insertLink(blob.el, PYTHON_IMPORT, {
      resolver: 'pythonUniversal',
      target: '$1',
      path: blob.path,
    });
  }
}
