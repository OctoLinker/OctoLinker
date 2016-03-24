const regexList = [
  /require(?:.resolve)?(?:\s|\()(['"][^'"\s]+['"])\)?/g,
  /import\s+(?:.+\s+from\s+)?(['"][^'"\s]+['"])/g,
];

export default function(text) {
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
}
