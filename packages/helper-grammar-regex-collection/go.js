import escapeRegexString from 'escape-regex-string';
import bylineParser from '../byline-parser';

const DOMAIN_REGEX = /^((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}/;
const ALLOWED_DOMAINS = [
  'github.com',
  'bitbucket.org',
  'launchpad.net',
  'hub.jazz.net',
  'gopkg.in',
];

function multiImportRegExpBuilder(input) {
  return bylineParser(input, {
    openingPattern: /^import\s\($/,
    closingPattern: /^\)$/,
    matchPattern: /"([^"]+)"/,
  })
  .map(([value]) => {
    const domain = value.match(DOMAIN_REGEX);

    if (domain && !ALLOWED_DOMAINS.includes(domain[0])) {
      return;
    }

    const val = escapeRegexString(value);
    return new RegExp(`import\\s\\([^\)]+"(${val})"`, 'gm');
  })
  .filter(item => !!item);
}

export default function (blobSource) {
  return [].concat(
    multiImportRegExpBuilder(blobSource),
    /import\s(?:[_\.]\s|[\w]+\s)?['"]([^'"\s]+)['"]?/g,
  );
}
