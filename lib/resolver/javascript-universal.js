import builtins from 'builtins';
import javascriptFile from './javascript-file.js';
import liveResolverQuery from './live-resolver-query.js';
import liveResolverPing from './live-resolver-ping.js';

export default function ({ path, target }) {
  const isPath = !!target.match(/^\.\.?[\\|/]?/);
  const isBuildIn = builtins.indexOf(target) > -1;

  if (isBuildIn) {
    return liveResolverPing({
      target: `https://nodejs.org/api/${target}.html`,
    });
  }

  if (isPath) {
    return javascriptFile({ target, path });
  }

  return [
    liveResolverQuery({ type: 'npm', target }),
    liveResolverQuery({ type: 'bower', target }),
  ];
}
