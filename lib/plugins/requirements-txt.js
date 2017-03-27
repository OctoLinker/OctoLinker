import { REQUIREMENTS_TXT } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import preset from '../pattern-preset';
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

  getPattern() {
    return preset('RequirementsTxt');
  }

  parseBlob(blob) {
    insertLink(blob.el, REQUIREMENTS_TXT, {
      pluginName: this.constructor.name,
      target: '$1',
      path: blob.path,
    });
  }
}
