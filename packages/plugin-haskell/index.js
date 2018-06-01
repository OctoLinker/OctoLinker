import { HASKELL_IMPORT } from '@octolinker/helper-grammar-regex-collection';
import { hoogleSearch } from '@octolinker/resolver-hoogle-search';

export default {
  name: 'Haskell',

  resolve(path, [target]) {
    const filePath = target.replace(/\./g, '/');
    const basePath = path.split(/\/(src|lib|app|test)\//)[0];

    return [
      `{BASE_URL}${basePath}/src/${filePath}.hs`,
      `{BASE_URL}${basePath}/lib/${filePath}.hs`,
      `{BASE_URL}${basePath}/app/${filePath}.hs`,
      `{BASE_URL}${basePath}/test/${filePath}.hs`,
      `{BASE_URL}${basePath}/${filePath}.hs`,
      hoogleSearch({ target }),
    ];
  },

  getPattern() {
    return {
      pathRegexes: [/\.hs$/],
      githubClasses: ['type-haskell'],
    };
  },

  getLinkRegexes() {
    return HASKELL_IMPORT;
  },
};
