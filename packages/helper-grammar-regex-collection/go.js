import escapeRegexString from 'escape-regex-string';
import bylineParser from '../byline-parser';

function multiImportRegExpBuilder(input) {
  return bylineParser(input, {
    openingPattern: /^import\s\($/,
    closingPattern: /^\)$/,
    matchPattern: /"([^"]+)"/,
  })
  .map((value) => {
    const val = escapeRegexString(value[0]);
    return new RegExp(`import\\s\\([^\)]+"(${val})"`, 'gm');
  });
}

export default function (blobSource) {
  return [].concat(
    multiImportRegExpBuilder(blobSource),
    /import\s(?:[_\.]\s|[\w]+\s)?['"]([^'"\s]+)['"]?/g,
  );
}
