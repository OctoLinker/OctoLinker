function getLineFromPos(str, pos, matchPartial, matchValue) {
  let offset = 1;

  // When match is within multiple lines
  if (matchPartial && /[\n\r]/g.test(matchPartial)) {
    offset = getLineFromPos(matchPartial, matchPartial.indexOf(matchValue));
  }

  const lines = str.substr(0, pos).match(/[\n\r]/g);
  return lines ? lines.length + offset : offset;
}

export default function (blobString, regex) {
  const lines = blobString.split('\n');

  return [...blobString.matchAll(regex)]
    .map((match) => {
      const matchPartial = match[0];
      const matchValue = match[1];

      if (!matchValue) {
        return undefined;
      }

      const lineNumber = getLineFromPos(
        blobString,
        match.index,
        matchPartial,
        matchValue,
      );

      let matchValueStriped = matchValue;
      if (matchValue.length !== matchValue.replace(/['|"]/g, '').length) {
        matchValueStriped = matchValueStriped.replace(/['|"]/g, '');
      }

      const line = lines[lineNumber - 1];
      const startPos = line.lastIndexOf(matchValue);
      const endPos = startPos + matchValue.length;

      const offset = lineNumber === 1 ? 0 : 1;
      const startPosInBlob =
        lines.slice(0, lineNumber - 1).join(' ').length + startPos + offset;
      const endPosInBlob = startPosInBlob + matchValue.length;

      return {
        lineNumber,
        startPosInBlob,
        endPosInBlob,
        startPos,
        endPos,
        values: [matchValueStriped, ...match.slice(2)],
      };
    })
    .filter(Boolean);
}
