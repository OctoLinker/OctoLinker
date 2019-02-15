import { fetchTree } from '@octolinker/helper-github-api';
import { bulkAction } from '@octolinker/helper-octolinker-api';

function matchFor({ urls }, types) {
  return urls.every(url => types.some(type => type === url.type));
}

function filterLiveResolver(matches) {
  return matches.reduce(
    (memo, match) => {
      if (match.urls.length === 0) {
        return memo;
      }

      if (matchFor(match, ['registry', 'ping'])) {
        // Match contains just external urls
        memo.external.push(match);
      } else if (matchFor(match, ['internal-link'])) {
        // Match contains just internal urls
        memo.internal.push(match);
      } else {
        // Match contains both internal and external urls
        memo.internal.push(match);
        memo.external.push(match);
      }

      return memo;
    },
    {
      external: [],
      internal: [],
    },
  );
}
function getRepoMetadata(data) {
  // Find first internal links which contains the information we need
  const result = data.find(item =>
    item.urls.find(({ type }) => type === 'internal-link'),
  );

  if (result && result.urls[0]) {
    const { user, repo, branch } = result.urls[0];
    return { user, repo, branch };
  }

  return {};
}

async function resolveInternalLinks(data) {
  const { user, repo, branch } = getRepoMetadata(data);

  let tree = [];
  if (user && repo && branch) {
    tree = await fetchTree({ user, repo, branch });
  }

  for (const { urls, link } of data) {
    if (link.href) {
      // Return early if link is already set
      return;
    }

    for (const item of urls) {
      if (item.type === 'internal-link' && tree.includes(item.path)) {
        link.href = item.url;
        break;
      }
    }
  }
}

async function resolveExternalLinks(data) {
  const response = await bulkAction(data);

  data.forEach(({ link, urls }) => {
    urls.forEach(url => {
      if (link.href) {
        // Return early if link is already set
        return;
      }

      try {
        const finalUrl = response.find(
          ({ type, target }) =>
            (type === url.registry || type === url.type) &&
            target === url.target,
        );

        if (finalUrl && finalUrl.result) {
          link.href = finalUrl.result;
        }
      } catch (error) {
        // error
      }
    });
  });
}

export default async function(matches) {
  const { external, internal } = filterLiveResolver(matches);

  resolveExternalLinks(external);
  resolveInternalLinks(internal);
}
