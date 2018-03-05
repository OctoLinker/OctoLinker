import { join, dirname, extname } from 'path';
import concatMap from 'concat-map';
import {
  REQUIRE,
  IMPORT,
  EXPORT,
} from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';
import builtinsDocs from './builtins-docs.js';

function getTopModuleName(target) {
  const isScoped = target.startsWith('@');
  const numComponents = isScoped ? 2 : 1;
  const topModuleName = target
    .split('/')
    .slice(0, numComponents)
    .join('/');
  return topModuleName;
}

export function javascriptFile({ path, target }) {
  const list = [];
  const extName = ['.js', '.jsx', '.ts', '.tsx', '.ls', '.json'];
  const basePath = join(dirname(path), target);
  const pathExt = extname(path);
  const fileExt = extname(basePath);

  if (extName.includes(fileExt)) {
    return javascriptFile({
      path,
      target: target.replace(fileExt, ''),
    });
  }

  if (pathExt && !extName.includes(pathExt)) {
    extName.unshift(pathExt);
  }

  extName.forEach(ext => {
    list.push(ext);
    list.push(`/index${ext}`);
  });

  list.push('');

  return concatMap(list, file => {
    const origPath = `{BASE_URL}${basePath}${file}`;
    const paths = [origPath];

    if (origPath.includes('/dist/')) {
      paths.push(origPath.replace('/dist/', '/lib/'));
      paths.push(origPath.replace('/dist/', '/src/'));
    } else if (origPath.includes('/lib/')) {
      paths.push(origPath.replace('/lib/', '/src/'));
    }

    return paths;
  });
}

export default {
  name: 'JavaScript',

  resolve(path, [target]) {
    const isPath = !!target.match(/^\.\.?[\\|\/]?/);
    const isBuildIn = target in builtinsDocs;

    if (isBuildIn) {
      return builtinsDocs[target];
    }

    if (isPath) {
      return javascriptFile({ target, path });
    }

    target = target.replace(/[^\w-.!~*'()@/]/g, '');

    // If the target looks like 'foo/bar.js', pretend it is 'foo' instead. See
    // https://github.com/OctoLinker/browser-extension/issues/93
    const topModuleName = getTopModuleName(target);

    return [
      liveResolverQuery({ type: 'npm', target: topModuleName }),
      liveResolverQuery({ type: 'bower', target: topModuleName }),
    ];
  },

  getPattern() {
    return {
      pathRegexes: [
        /\.jsx?$/,
        /\.es6$/,
        // CoffeeScript
        /\.coffee$/,
      ],
      githubClasses: [
        'type-javascript',
        'type-jsx',
        'highlight-source-js',
        // CoffeeScript
        'type-coffeescript',
        'highlight-source-coffee',
      ],
    };
  },

  getLinkRegexes() {
    return [REQUIRE, IMPORT, EXPORT];
  },
};
