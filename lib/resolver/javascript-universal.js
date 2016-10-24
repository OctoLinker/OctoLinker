import builtinsDocs from '../utils/builtins-docs.js';
import javascriptFile from './javascript-file.js';
import liveResolverQuery from './live-resolver-query.js';

function getTopModuleName(target) {
  const isScoped = target.startsWith('@');
  const numComponents = isScoped ? 2 : 1;
  const topModuleName = target.split('/').slice(0, numComponents).join('/');
  return topModuleName;
}

export default function ({ path, target }) {
  const isPath = !!target.match(/^\.\.?[\\|\/]?/);
  const isBuildIn = target in builtinsDocs;

  if (isBuildIn) {
    return builtinsDocs[target];
  }

  if (isPath) {
    return javascriptFile({ target, path });
  }

  // If the target looks like 'foo/bar.js', pretend it is 'foo' instead. See
  // https://github.com/OctoLinker/browser-extension/issues/93
  const topModuleName = getTopModuleName(target);

  return [
    liveResolverQuery({ type: 'npm', target: topModuleName }),
    liveResolverQuery({ type: 'bower', target: topModuleName }),
  ];
}
