import JavaScript from '../javascript';
import { TYPESCRIPT_REFERENCE } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';
import preset from '../../pattern-preset';

export default class TypeScript extends JavaScript {
  getPattern() {
    return preset('TypeScript');
  }

  parseBlob(blob) {
    super.parseBlob(blob);

    insertLink(blob.el, TYPESCRIPT_REFERENCE, {
      resolver: 'relativeFile',
      target: '$1',
      path: blob.path,
    });
  }
}
