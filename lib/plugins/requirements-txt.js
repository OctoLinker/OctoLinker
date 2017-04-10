import { REQUIREMENTS_TXT } from '../../packages/helper-grammar-regex-collection/index.js';
import liveResolverQuery from '../resolver/live-resolver-query.js';

export default class RequirementsTxt {

  static resolve({ target }) {
    return [
      liveResolverQuery({
        target,
        type: 'pypi',
      }),
    ];
  }

  static getPattern() {
    return {
      pathPatterns: ['requirements.txt$'],
      githubClasses: [],
    };
  }

  static getLinkRegexes() {
    return REQUIREMENTS_TXT;
  }
}
