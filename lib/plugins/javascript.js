import { join, dirname, extname } from 'path';
import { REQUIRE, IMPORT, EXPORT } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import preset from '../pattern-preset';
import builtinsDocs from '../utils/builtins-docs.js';
import liveResolverQuery from '../resolver/live-resolver-query.js';

function getTopModuleName(target) {
  const isScoped = target.startsWith('@');
  const numComponents = isScoped ? 2 : 1;
  const topModuleName = target.split('/').slice(0, numComponents).join('/');
  return topModuleName;
}

function javascriptFile({ path, target }) {
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

  return list.map(file => `{BASE_URL}${basePath}${file}`);
}

export default class JavaScript {
  static resolve({ target, path }) {
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

  getPattern() {
    return preset('JavaScript', 'CoffeeScript');
  }

  parseBlob(blob) {
    [REQUIRE, IMPORT, EXPORT].forEach((regex) => {
      insertLink(blob.el, regex, {
        pluginName: this.constructor.name,
        target: '$1',
        path: blob.path,
      });
    });
  }
}
