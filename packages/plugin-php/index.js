import { PHP, PHP_FUNC } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';

export default {
  name: 'PHP',

  resolve(path, [target], meta, regExp) {
    if (target.includes('\\')) {
      return;
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
