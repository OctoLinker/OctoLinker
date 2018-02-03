import { PYTHON_IMPORT } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';
import relativeFile from '@octolinker/resolver-relative-file';

export default {
  name: 'Python',

  resolve({ path, target }) {
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
  },

  getPattern() {
    return {
      pathRegexes: [/\.py$/],
      githubClasses: ['type-python', 'highlight-source-python'],
    };
  },

  getLinkRegexes() {
    return PYTHON_IMPORT;
  },
};
