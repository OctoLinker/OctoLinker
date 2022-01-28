import { extname } from 'path';
import concatMap from 'concat-map';
import {
  REQUIRE,
  IMPORT,
  EXPORT,
} from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';
import resolverTrustedUrl from '@octolinker/resolver-trusted-url';
import relativeFile from '@octolinker/resolver-relative-file';
import builtinsDocs from './builtins-docs.js';

function getTopModuleName(target) {
  const isScoped = target.startsWith('@');
  const numComponents = isScoped ? 2 : 1;
  const topModuleName = target.split('/').slice(0, numComponents).join('/');
  return topModuleName;
}

export function javascriptFile({ path, target }) {
  if (!path) {
    return [];
  }

  const list = [];
  const extName = ['.js', '.jsx', '.ts', '.tsx', '.ls', '.json'];
  const basePath = relativeFile({ path, target });
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

  extName.forEach((ext) => {
    list.push(ext);
    list.push(`/index${ext}`);
  });

  list.push('');

  return concatMap(list, (file) => {
    const origPath = `${basePath}${file}`;
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

function isURLImport(target) {
  try {
    const { origin } = new URL(target);
    return !!origin;
  } catch (error) {
    return false;
  }
}

export default {
  name: 'JavaScript',

  resolve(path, [target]) {
    if (target.startsWith('node:')) {
      target = target.substring(5);
    }

    if (isURLImport(target)) {
      return resolverTrustedUrl({ target });
    }

    const isBuiltIn = target in builtinsDocs;
    if (isBuiltIn) {
      return resolverTrustedUrl({ target: builtinsDocs[target] });
    }

    const isPath = !!target.match(/^\.\.?[\\|\/]?/);
    if (isPath) {
      return javascriptFile({ target, path });
    }

    target = target.replace(/[^\w-.!~*'()@/]/g, '');

    // If the target looks like 'foo/bar.js', pretend it is 'foo' instead. See
    // https://github.com/OctoLinker/browser-extension/issues/93
    const topModuleName = getTopModuleName(target);

    return liveResolverQuery({ type: 'npm', target: topModuleName });
  },

  getPattern() {
    return {
      pathRegexes: [
        /\.jsx?$/,
        /\.es6$/,
        // CoffeeScript
        /\.coffee$/,
        /\.vue$/,
        /\.svelte$/,
      ],
      githubClasses: [
        'type-javascript',
        'type-jsx',
        'highlight-source-js',
        // CoffeeScript
        'type-coffeescript',
        'highlight-source-coffee',
        'type-vue',
      ],
    };
  },

  getLinkRegexes() {
    return [REQUIRE, IMPORT, EXPORT];
  },
};
