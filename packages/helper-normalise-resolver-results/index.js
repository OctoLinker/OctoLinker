import ghParse from 'github-url-parse';

const BASE_URL = 'https://github.com';

// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url/22648406#22648406
function isURL(str) {
  const urlRegex =
    '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  const url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
}

// Resource within this repositroy
const internal = (url) => {
  const fullUrl = url.replace('{BASE_URL}', BASE_URL);
  const { user, repo, branch, path } = ghParse(fullUrl) || {};

  return {
    type: 'internal-link',
    url: fullUrl,
    user,
    repo,
    branch,
    path,
  };
};

// An external url like a documenation page
const external = (url) => {
  const target = url.replace('{BASE_URL}', BASE_URL);

  if (!isURL(target)) {
    return {};
  }

  return {
    type: 'ping',
    target,
  };
};

// Async resolver
const func = (handler) => ({
  type: 'function',
  handler,
});

// Needs to be validated through https://githublinker.herokuapp.com/
const registry = ({ registry: type, target }) => ({
  type: 'registry',
  registry: type,
  target,
});

export default function (urls) {
  return [].concat(urls).map((url) => {
    if (typeof url === 'string') {
      const [, user, repo] = url.split('/');

      if (url.startsWith(`{BASE_URL}/${user}/${repo}/blob/`)) {
        return internal(url);
      }

      return external(url);
    }

    if (url.registry) {
      return registry(url);
    }

    if (url.type === 'github-search') {
      return {
        type: url.type,
        target: url.target,
        path: url.path,
      };
    }

    if (url.type === 'trusted-url') {
      return {
        type: url.type,
        target: url.target,
      };
    }

    if (typeof url === 'function') {
      return func(url);
    }
  });
}
