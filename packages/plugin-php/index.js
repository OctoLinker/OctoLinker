import { PHP, PHP_FUNC } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';
import resolverTrustedUrl from '@octolinker/resolver-trusted-url';
import * as storage from '@octolinker/helper-settings';
import mappingList from './mapping';

export default {
  name: 'PHP',

  resolve(path, [target], meta, regExp) {
    const enableBetterPHP = storage.get('enableBetterPHP');
    if (enableBetterPHP) {
      const linkMapping = mappingList.find(({ importPath }) =>
        target.startsWith(`${importPath}\\`),
      );

      if (linkMapping) {
        const { url, delimiter, hook } = linkMapping;
        const targetPath = target.replace(/\\/g, delimiter);

        return resolverTrustedUrl({
          target: url.replace('%s', targetPath),
        });
      }

      if (target.startsWith('Doctrine\\')) {
        const targetPath = target.replace(/\\/g, '/');
        const [, repo] = targetPath.split('/');

        return resolverTrustedUrl({
          target: `https://github.com/doctrine/${repo}/blob/HEAD/lib/${targetPath}.php`,
        });
      }

      if (target.startsWith('PHPUnit\\')) {
        const targetPath = target.replace(/\\/g, '/');
        const [, ...filePath] = targetPath.split('/');

        return resolverTrustedUrl({
          target: `https://github.com/sebastianbergmann/phpunit/blob/master/src/${filePath.join(
            '/',
          )}.php`,
        });
      }
    }

    if (target.includes('\\')) {
      return [];
    }

    if (regExp === PHP_FUNC) {
      return liveResolverQuery({
        type: 'ping',
        target: `https://www.php.net/manual/en/function.${target
          .toLowerCase()
          .replace(/_/g, '-')}.php`,
      });
    }

    return liveResolverQuery({
      type: 'ping',
      target: `https://www.php.net/manual/en/class.${target.toLowerCase()}.php`,
    });
  },

  getPattern() {
    return {
      pathRegexes: [/\.php$/],
      githubClasses: ['type-php', 'highlight-text-html-php'],
    };
  },

  getLinkRegexes() {
    return [PHP, PHP_FUNC];
  },
};
