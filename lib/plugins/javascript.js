import { join, dirname, extname } from 'path';
import concatMap from 'concat-map';
import { REQUIRE, IMPORT, EXPORT } from '../../packages/helper-grammar-regex-collection/index.js';
import builtinsDocs from '../utils/builtins-docs.js';
import liveResolverQuery from '../resolver/live-resolver-query.js';

function getTopModuleName(target) {
  const isScoped = target.startsWith('@');
  const numComponents = isScoped ? 2 : 1;
  const topModuleName = target.split('/').slice(0, numComponents).join('/');
  return topModuleName;
}

export function javascriptFile({ path, target }) {
  const list = [];
  const extName = ['.js', '.jsx', '.ts', '.tsx', '.json'];
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

  extName.forEach((ext) => {
    list.push(ext);
    list.push(`/index${ext}`);
  });

  list.push('');

  return concatMap(list, (file) => {
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

  resolve({ target, path }) {
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
  },

  getPattern() {
    return {
      pathPatterns: [
        '.js$',
        '.jsx$',
        '.es6$',
        // CoffeeScript
        '.coffee$',
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
