import $ from 'jquery';
import * as storage from '@octolinker/helper-settings';
import { showTooltip, removeTooltip } from '@octolinker/user-interface';

const SORRY = "I'm sorry, unable to resolve this link  😱";
const PROCESS = 'Processing  ⏳';
const RESOLVED = 'Redirecting  🚀';

const LINK_SELECTOR = '.octolinker-link';
const $body = $('body');
let matches;

function openUrl(event, url) {
  if (!url) {
    return;
  }

  const newWindow =
    storage.get('newWindow') ||
    event.metaKey ||
    event.ctrlKey ||
    event.which === 2;
  const newWindowActive = storage.get('newWindowActive');

  if (newWindow) {
    chrome.runtime.sendMessage({
      type: 'newTab',
      payload: {
        url,
        active: newWindowActive,
      },
    });
  } else {
    window.location.href = url;
  }
}

function getResolverUrls(event, urls) {
  return [].concat(urls).map(item => {
    if (!item) {
      return null;
    }

    // github-search resolver returns a function
    if (item.type === 'function') {
      return {
        func: item.handler,
      };
    }

    // Live-query resolver results
    if (item.type === 'registry') {
      let cacheResult;

      try {
        cacheResult = global.__ocotlinker_cache[item.registry][item.target];
      } catch (error) {
        //
      }

      if (cacheResult) {
        openUrl(event, cacheResult);
        return [];
      }

      return {
        url: `https://githublinker.herokuapp.com/q/${item.registry}/${
          item.target
        }`,
        method: 'GET',
      };
    }

    // Relative file
    if (item.type === 'internal-link') {
      return {
        url: item.url,
      };
    }

    // External urls
    return {
      url: `https://githublinker.herokuapp.com/ping?url=${item.url}`,
      method: 'GET',
    };
  });
}

async function onClick(event) {
  // ignore mouseup events on non-middle buttons
  // see https://github.com/OctoLinker/browser-extension/pull/173#issuecomment-243895366
  if (event.type === 'mouseup' && event.which !== 2) {
    return;
  }

  const found = matches.find(item => item.link === event.currentTarget);
  if (!found) {
    return;
  }

  const $tooltipTarget = $('span', event.currentTarget);

  showTooltip($tooltipTarget, PROCESS);

  const urls = getResolverUrls(event, found.urls);

  if (!urls.length) {
    return;
  }

  // const { url, res } = await fetch(urls);
  chrome.runtime.sendMessage({ type: 'fetch', urls }, res => {
    if (res === 'error') {
      showTooltip($tooltipTarget, SORRY);
      return;
    }
    showTooltip($tooltipTarget, RESOLVED);
    openUrl(event, (res || {}).url || res);
    removeTooltip($tooltipTarget);
  });
}

export default function(_matches) {
  $body.undelegate(LINK_SELECTOR, 'click', onClick);
  $body.undelegate(LINK_SELECTOR, 'mouseup', onClick);

  $body.delegate(LINK_SELECTOR, 'click', onClick);
  $body.delegate(LINK_SELECTOR, 'mouseup', onClick);

  matches = _matches;
}
