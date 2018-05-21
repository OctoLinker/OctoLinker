import { PYTHON_IMPORT } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';
import relativeFile from '@octolinker/resolver-relative-file';

export default {
  name: 'Python',

  resolve(path, [target, subTarget]) {
    const isLocalFile = target.startsWith('.');
    const normalizedTarget = target.replace(/\./g, '/');
    const apiDoc = `https://docs.python.org/3/library/${target}.html`;

    if (isLocalFile) {
      const newTarget = target.slice(1);
      if (target === '.' && !subTarget) {
        return relativeFile({
          target: '__init__.py',
          path,
        });
      }

      if (target === '.' && subTarget) {
        return [
          relativeFile({
            target: `${newTarget}/${subTarget}.py`,
            path,
          }),
          relativeFile({
            target: `${newTarget}/${subTarget}/__init__.py`,
            path,
          }),
        ];
      }

      if (subTarget) {
        return [
          relativeFile({
            target: `${normalizedTarget}/${subTarget}.py`,
            path,
          }),
          relativeFile({
            target: `${normalizedTarget}.py`,
            path,
          }),
          relativeFile({
            target: `${normalizedTarget}/__init__.py`,
            path,
          }),
        ];
      }

      return [
        relativeFile({
          target: `${normalizedTarget}.py`,
          path,
        }),
        relativeFile({
          target: `${normalizedTarget}/__init__.py`,
          path,
        }),
      ];
    }

    if (subTarget) {
      return [
        relativeFile({
          target: `${normalizedTarget}/${subTarget}.py`,
          path,
        }),
        relativeFile({
          target: `${normalizedTarget}/${subTarget}/__init__.py`,
          path,
        }),
        relativeFile({
          target: `${normalizedTarget}.py`,
          path,
        }),
        relativeFile({
          target: `${normalizedTarget}/__init__.py`,
          path,
        }),
        apiDoc,
        liveResolverQuery({
          target: target.split('.')[0],
          type: 'pypi',
        }),
      ];
    }

    return [
      relativeFile({
        target: `${normalizedTarget}.py`,
        path,
      }),
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
