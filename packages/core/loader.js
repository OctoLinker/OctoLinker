import { fetchTree } from '@octolinker/helper-github-api';
import { bulkAction } from '@octolinker/helper-octolinker-api';
import uniqWith from 'lodash.uniqwith';
import isEqual from 'lodash.isequal';

function getRepoMetadata(data) {
  // Find first internal links which contains the information we need
  // TODO handle also githubSearch resolver results. Right now this works,
  // because a relative file resolver is used as well in the less and sass plugin
  return data.find(({ type }) => type === 'internal-link') || {};
}

function removeDuplicates(payload) {
  return uniqWith(payload, (left, right) =>
    // The link property is part of the item and prevents us from using a
    // simple isEqual operation. By concatenating all other props we can easily
    // identify duplications
    isEqual(
      left.type + left.registry + left.target,
      right.type + right.registry + right.target,
    ),
  );
}

function groupMatchesByType(matches) {
  const flattenUrls = removeDuplicates(
    [].concat(
      ...matches.map(match =>
        match.urls.map(url => ({
          ...url,
          link: match.link,
        })),
      ),
    ),
  );

  const apiItems = flattenUrls.filter(({ type }) =>
    ['registry', 'ping'].includes(type),
  );

  const internalItems = flattenUrls.filter(({ type }) =>
    ['internal-link', 'github-search'].includes(type),
  );

  const trustedItems = flattenUrls.filter(({ type }) =>
    ['trusted-url'].includes(type),
  );

  return {
    apiItems,
    internalItems,
    trustedItems,
  };
}

function insertLinks({
  matches,
  githubTree,
  octolinkerApiResponse,
  user,
  repo,
  branch,
}) {
  matches.forEach(({ urls, link }) => {
    if (link.href) {
      // Return early if link is already set
      return;
    }

    for (const item of urls) {
      if (item.type === 'internal-link') {
        if (githubTree.includes(item.path)) {
          link.href = item.url;
          break;
        }
      } else if (item.type === 'github-search') {
        const allMatches = githubTree.filter(path =>
          path.endsWith(item.target),
        );

        if (allMatches.length === 1) {
          link.href = `https://github.com/${user}/${repo}/blob/${branch}/${
            allMatches[0]
          }`;
          break;
        }
        // TODO implement https://www.npmjs.com/package/fast-levenshtein
      } else if (['registry', 'ping'].includes(item.type)) {
        const finalUrl = octolinkerApiResponse.find(
          ({ type, target }) =>
            (type === item.registry || type === item.type) &&
            target === item.target,
        );

        if (finalUrl && finalUrl.result) {
          link.href = finalUrl.result;
          break;
        }
      }
    }
  });
}

export default async function(matches) {
  const { apiItems, internalItems, trustedItems } = groupMatchesByType(matches);

  let octolinkerApiResponsePromise = [];
  let githubTreePromise = [];

  if (apiItems.length) {
    octolinkerApiResponsePromise = bulkAction(apiItems);
  }

  let user;
  let repo;
  let branch;
  if (internalItems.length) {
    ({ user, repo, branch } = getRepoMetadata(internalItems));

    if (user && repo && branch) {
      githubTreePromise = fetchTree({ user, repo, branch });
    }
  }

  trustedItems.forEach(item => {
    item.link.href = item.target;
  });

  const octolinkerApiResponse = await octolinkerApiResponsePromise;
  const githubTree = await githubTreePromise;

  // TODO explore resolving on the fly so we don't have to wait for both calls to finish

  insertLinks({
    matches,
    octolinkerApiResponse,
    githubTree,
    user,
    repo,
    branch,
  });
}
