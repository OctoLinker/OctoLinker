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

function injectLiveDemoUrl(url) {
  return url.replace('https://github.com', process.env.OCTOLINKER_LIVE_DEMO);
}

function groupMatchesByType(matches) {
  const flattenUrls = [].concat(
    ...matches.map((match) =>
      match.urls.map((url) => ({
        ...url,
        link: match.link,
      })),
    ),
  );

  const apiItems = removeDuplicates(flattenUrls).filter(({ type }) =>
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
        if (githubTree.includes(item.path.replace(/%20/g, ' '))) {
          link.href = item.url;
          if (process.env.OCTOLINKER_LIVE_DEMO) {
            link.href = injectLiveDemoUrl(link.href);
          }
          break;
        }
      } else if (item.type === 'github-search') {
        const allMatches = githubTree.filter((path) =>
          path.endsWith(item.target),
        );

        if (allMatches.length === 1) {
          link.href = `https://github.com/${user}/${repo}/blob/${branch}/${allMatches[0]}`;
          if (process.env.OCTOLINKER_LIVE_DEMO) {
            link.href = injectLiveDemoUrl(link.href);
          }
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

          if (finalUrl.result.startsWith('https://github.com')) {
            [, , , user, repo] = finalUrl.result.split('/');
            link.dataset.repositoryHovercardsEnabled = true;
            link.dataset.hovercardType = 'repository';
            link.dataset.hovercardUrl = `/${user}/${repo}/hovercard`;
          }

          if (process.env.OCTOLINKER_LIVE_DEMO) {
            link.href = injectLiveDemoUrl(link.href);
          }
          break;
        }
      }
    }
  });
}

export default async function (matches) {
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

  trustedItems.forEach((item) => {
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

  if (process.env.OCTOLINKER_LIVE_DEMO) {
    let parentElement = document;

    const activeLineNumber = window.location.hash.match(/#LO([0-9]+)/);
    if (activeLineNumber && activeLineNumber[1]) {
      parentElement = document.getElementById(`LC${activeLineNumber[1]}`);
    }

    const el = parentElement.querySelector('.octolinker-link[href]');
    if (el) {
      el.classList.add('octospotlight');

      const container = document.createElement('div');
      container.innerHTML = `<div class="octospotlight-inner">${el.innerHTML}</div>`;
      el.innerHTML = container.innerHTML;

      const spot = document.createElement('div');
      spot.classList.add('octospotlight-dot');
      el.querySelector('.octospotlight-inner').appendChild(spot);
    }
  }
}
