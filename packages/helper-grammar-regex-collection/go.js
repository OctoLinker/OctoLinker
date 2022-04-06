import escapeRegexString from 'escape-regex-string';
import bylineParser from '@octolinker/helper-parser-byline';

const DOMAIN_REGEX =
  /^((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}/;
const ALLOWED_DOMAINS = [
  'github.com',
  'bitbucket.org',
  'launchpad.net',
  'hub.jazz.net',
  'gopkg.in',
  'golang.org',
  'k8s.io',
  'pkg.go.dev',
];

// For go.mod file

function multiRequireRegExpBuilder(input) {
  return bylineParser(input, {
    openingPattern: /^require\s\($/,
    closingPattern: /^\)$/,
    matchPattern: /^\s?([\S]+)/,
  }).map(([value]) => {
    const domain = value.match(DOMAIN_REGEX);

    if (domain && !ALLOWED_DOMAINS.includes(domain[0])) {
      return;
    }

    const val = escapeRegexString(value);

    return new RegExp(`require\\s\\([^\)"]+(${val})`, 'gm');
  });
}

function singleRequireRegExpBuilder(input) {
  return bylineParser(input, {
    matchPattern: /require\s+([^\s\(\)"]+)/,
  }).map(([value]) => {
    const domain = value.match(DOMAIN_REGEX);

    if (domain && !ALLOWED_DOMAINS.includes(domain[0])) {
      return;
    }

    const val = escapeRegexString(value);

    return new RegExp(`require\\s+(${val})`, 'gm');
  });
}

// For regular go files

function multiImportRegExpBuilder(input) {
  return bylineParser(input, {
    openingPattern: /^import\s\($/,
    closingPattern: /^\)$/,
    matchPattern: /"([^"]+)"/,
  }).map(([value]) => {
    const domain = value.match(DOMAIN_REGEX);

    if (domain && !ALLOWED_DOMAINS.includes(domain[0])) {
      return;
    }

    const val = escapeRegexString(value);
    return new RegExp(`import\\s\\([^\)]+"(${val})"`, 'gm');
  });
}

function singleImportRegExpBuilder(input) {
  return bylineParser(input, {
    matchPattern: /import\s(?:[_\.]\s|[\w]+\s)?['"]([^'"\s]+)['"]?/,
  }).map(([value]) => {
    const domain = value.match(DOMAIN_REGEX);

    if (domain && !ALLOWED_DOMAINS.includes(domain[0])) {
      return;
    }

    const val = escapeRegexString(value);
    return new RegExp(
      `import\\s(?:[_\\.]\\s|[\\w]+\\s)?['"](${val})['"]?`,
      'gm',
    );
  });
}

export default function (blobSource) {
  return []
    .concat(
      multiImportRegExpBuilder(blobSource),
      singleImportRegExpBuilder(blobSource),
      multiRequireRegExpBuilder(blobSource),
      singleRequireRegExpBuilder(blobSource),
    )
    .filter((item) => !!item);
}
