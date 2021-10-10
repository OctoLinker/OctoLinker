import ghParse from 'github-url-parse';

const BASE_URL = 'https://github.com';

function isURL(str) {
  // RegExp origin https://stackoverflow.com/a/3809435/2121324
  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const urlRegex = new RegExp(expression);

  return urlRegex.test(str);
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
