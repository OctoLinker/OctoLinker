import $ from 'jquery';
import * as storage from '@octolinker/helper-settings';
import { showTooltip, removeTooltip } from '@octolinker/user-interface';
import fetch from './utils/fetch.js';

const SORRY = "I'm sorry, unable to resolve this link  😱";
const PROCESS = 'Processing  ⏳';
const RESOLVED = 'Redirecting  🚀';

const LINK_SELECTOR = '.octolinker-link';
const $body = $('body');
let matches;

function openUrl(url, newWindow = false, newWindowActive = true) {
  if (!url) {
    return;
  }

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

function getResolverUrls(urls) {
  const BASE_URL = 'https://github.com';

  return [].concat(urls).map(url => {
    if (!url) {
      return null;
    }

    // github-search resolver returns a function
    if (typeof url === 'function') {
      return {
        func: url,
      };
    }

    // Live-query resolver results
    if (url.startsWith('https://githublinker.herokuapp.com')) {
      return {
        url,
        method: 'GET',
      };
    }

    // Relative file
    if (url.startsWith('{BASE_URL}') || url.startsWith(BASE_URL)) {
      return {
        url: url.replace('{BASE_URL}', BASE_URL),
      };
    }

    // External urls
    return {
      url: `https://githublinker.herokuapp.com/ping?url=${url}`,
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

  const urls = getResolverUrls(found.urls);

  if (!urls.length) {
    return;
  }

  try {
    const { url, res } = await fetch(urls);

    showTooltip($tooltipTarget, RESOLVED);

    const newWindow =
      storage.get('newWindow') ||
      event.metaKey ||
      event.ctrlKey ||
      event.which === 2;
    const newWindowActive = storage.get('newWindowActive');
    openUrl((res || {}).url || url, newWindow, newWindowActive);
    removeTooltip($tooltipTarget);
  } catch (err) {
    showTooltip($tooltipTarget, SORRY);

    return console.error(err); // eslint-disable-line no-console
  }
}

export default function(_matches) {
  $body.undelegate(LINK_SELECTOR, 'click', onClick);
  $body.undelegate(LINK_SELECTOR, 'mouseup', onClick);

  $body.delegate(LINK_SELECTOR, 'click', onClick);
  $body.delegate(LINK_SELECTOR, 'mouseup', onClick);

  matches = _matches;
}
