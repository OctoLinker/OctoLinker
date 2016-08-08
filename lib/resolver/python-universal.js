import liveResolverQuery from './live-resolver-query.js';
import relativeFile from './relative-file.js';

export default function ({ path, target }) {
  const isLocalFile = target.startsWith('.') && target.length > 1;
  const isInit = target === '.';
  const apiDoc = `https://docs.python.org/3/library/${target}.html`;

  if (isLocalFile) {
    return relativeFile({
      target: target.slice(1) + '.py',
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
    liveResolverQuery({
      target: target.split('.')[0],
      type: 'pypi',
    }),
    apiDoc,
  ];
}
