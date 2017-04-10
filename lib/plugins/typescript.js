import JavaScript from './javascript';
import { TYPESCRIPT_REFERENCE } from '../../packages/helper-grammar-regex-collection/index.js';

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

  static getLinkRegexes(blob) {
    return JavaScript.getLinkRegexes(blob).concat(TYPESCRIPT_REFERENCE);
  }
}
