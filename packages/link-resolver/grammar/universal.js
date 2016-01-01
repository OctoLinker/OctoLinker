import {registerHandler} from '../../helper-click-handler';

const REQUIRE = /require(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const REQUIRE_RESOLVE = /require(?:.resolve)(?:\s|\()(['"][^'"\s]+['"])\)?/g;
const IMPORT = /import\s+(?:.+\s+from\s+)?(['"][^'"\s]+['"])/g;

const dict = new Map();
dict.set('JavaScript', [REQUIRE, REQUIRE_RESOLVE, IMPORT]);
dict.set('CoffeeScript', [REQUIRE, REQUIRE_RESOLVE, IMPORT]);
dict.set('TypeScript', [REQUIRE, IMPORT]);

export default function(type) {
  const regexList = dict.get(type);

  if (!regexList) {
    return null;
  }

  registerHandler(type, function(data) {
    console.log('universal click handler', data);
  });

  return function(text) {
    const ret = {};
    let match;

    function findKeywords(val) {
      const startIndex = text.indexOf(val, match.index) + 1;
      ret[startIndex] = val.replace(/['|"]/g, '');
    }

    regexList.forEach((regex) => {
      while (match = regex.exec(text)) { // eslint-disable-line no-cond-assign
        match.slice(1).map(findKeywords);
      }
    });

    return ret;
  };
}
