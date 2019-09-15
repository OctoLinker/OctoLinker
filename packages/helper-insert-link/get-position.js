const matchAll = require('string.prototype.matchall');

matchAll.shim();

function getLineFromPos(str, pos, matchPartial, matchValue) {
  let offset = 1;

  // When match is within multiple lines
  if (matchPartial && /[\n\r]/g.test(matchPartial)) {
    offset = getLineFromPos(matchPartial, matchPartial.indexOf(matchValue));
  }

  const lines = str.substr(0, pos).match(/[\n\r]/g);
  return lines ? lines.length + offset : offset;
}

export default function(blobString, regex) {
  const lines = blobString.split('\n');

  return [...blobString.matchAll(regex)].map(match => {
    const matchPartial = match[0];
    const matchValue = match[1];

    const lineNumber = getLineFromPos(
      blobString,
      match.index,
      matchPartial,
      matchValue,
    );

    let offset = 0;
    let matchValueStriped = matchValue;
    if (matchValue.length !== matchValue.replace(/['|"]/g, '').length) {
      offset = 1;
      matchValueStriped = matchValueStriped.replace(/['|"]/g, '');
    }

    const startPos = lines[lineNumber - 1].indexOf(match[1]) + offset;
    const endPos = startPos + matchValueStriped.length;

    return {
      lineNumber: lineNumber - 1,
      startPos,
      endPos,
      values: [matchValueStriped],
    };
  });
}
