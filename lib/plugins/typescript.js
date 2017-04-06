import JavaScript from './javascript';
import { TYPESCRIPT_REFERENCE } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';

export default class TypeScript extends JavaScript {
  static getPattern() {
    return {
      pathPatterns: ['.ts$'],
      githubClasses: [
        'type-typescript',
        'highlight-source-ts',
      ],
    };
  }

  parseBlob(blob) {
    super.parseBlob(blob);

    insertLink(blob.el, TYPESCRIPT_REFERENCE, {
      pluginName: this.constructor.name,
      target: '$1',
      path: blob.path,
    });
  }
}
