import ghParse from 'github-url-parse';

const BASE_URL = 'https://github.com';

// Resource within this repositroy
const internal = url => {
  const fullUrl = url.replace('{BASE_URL}', BASE_URL);
  const { user, repo, branch, path } = ghParse(fullUrl);

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
const external = url => ({
  type: 'ping',
  target: url,
});

// Async resolver
const func = handler => ({
  type: 'function',
  handler,
});

// Needs to be validated through https://githublinker.herokuapp.com/
const registry = ({ registry: type, target }) => ({
  type: 'registry',
  registry: type,
  target,
});

export default function(urls) {
  return [].concat(urls).map(url => {
    if (typeof url === 'string') {
      if (url.startsWith('{BASE_URL}')) {
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

    if (typeof url === 'function') {
      return func(url);
    }
  });
}
