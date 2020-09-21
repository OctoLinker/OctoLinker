import { PHP } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';

export default {
  name: 'PHP',

  resolve(path, [target]) {
    if (target.includes('\\')) {
      return;
    }

    const docsUrl = `https://www.php.net/manual/en/class.${target.toLowerCase()}.php`;
    return liveResolverQuery({ type: 'ping', target: docsUrl });
  },

  getPattern() {
    return {
      pathRegexes: [/\.php$/],
      githubClasses: ['type-php', 'highlight-text-html-php'],
    };
  },

  getLinkRegexes() {
    return PHP;
  },
};
