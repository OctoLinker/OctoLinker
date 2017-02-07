import { PYTHON_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import preset from '../pattern-preset';
import liveResolverQuery from '../resolver/live-resolver-query.js';
import relativeFile from '../resolver/relative-file.js';

export default class Python {

  static resolve({ path, target }) {
    const isLocalFile = target.startsWith('.') && target.length > 1;
    const isInit = target === '.';
    const apiDoc = `https://docs.python.org/3/library/${target}.html`;

    if (isLocalFile) {
      return relativeFile({
        target: `${target.slice(1)}.py`,
        path,
      });
    }

    if (isInit) {
      return relativeFile({
        target: '__init__.py',
        path,
      });
    }

    return [
      apiDoc,
      liveResolverQuery({
        target: target.split('.')[0],
        type: 'pypi',
      }),
    ];
  }

  getPattern() {
    return preset('Python');
  }

  parseBlob(blob) {
    insertLink(blob.el, PYTHON_IMPORT, {
      pluginName: this.constructor.name,
      target: '$1',
      path: blob.path,
    });
  }
}
