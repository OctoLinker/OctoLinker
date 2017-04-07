import { HASKELL_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';
import githubSearch from '../resolver/github-search.js';

export default {
  name: 'Haskell',

  resolve({ path, target }) {
    const [, user, repo] = path.split('/');
    const filePath = target.replace(/\./g, '/');
    return [
      `{BASE_URL}/${user}/${repo}/blob/master/src/${filePath}.hs`,
      `{BASE_URL}/${user}/${repo}/blob/master/lib/${filePath}.hs`,
      `{BASE_URL}/${user}/${repo}/blob/master/${filePath}.hs`,
      githubSearch({ path, target: `${filePath}.hs` }),
      `https://hackage.haskell.org/package/base/docs/${target.replace(/\./g, '-')}.html`,
    ];
  },

  getPattern() {
    return {
      pathPatterns: ['.hs$'],
      githubClasses: [
        'type-haskell',
      ],
    };
  },

  getLinkRegexes() {
    return HASKELL_IMPORT;
  },
};
