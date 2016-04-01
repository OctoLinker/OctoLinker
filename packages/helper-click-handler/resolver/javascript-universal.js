import builtins from 'builtins';
import javascriptFile from './javascript-file.js';
import resolverAPI from './resolver-api.js';

export default function ({ path, target }) {
  const isPath = !!target.match(/^\.\.?[\\|/]?/);
  const isBuildIn = builtins.indexOf(target) > -1;

  if (isBuildIn) {
    return resolverAPI({
      type: 'proxy',
      target: `https://nodejs.org/api/${target}.html`,
    });
  }

  if (isPath) {
    return javascriptFile({ target, path });
  }

  return [
    resolverAPI({ type: 'npm', target }),
    resolverAPI({ type: 'bower', target }),
  ];
}
