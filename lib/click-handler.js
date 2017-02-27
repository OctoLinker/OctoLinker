import $ from 'jquery';
import { showTooltip } from './gh-interface.js';
import * as storage from './options/storage.js';

const SORRY = 'I\'m sorry, unable to resolve this link  😱';
const PROCESS = 'Processing  ⏳';
const RESOLVED = 'Redirecting  🚀';

const LINK_SELECTOR = '.octolinker-link';
const $body = $('body');
let pluginManager;

let hasEventListener = false;

function openUrl(url, newWindow = false) {
  if (!url) {
    return;
  }

  if (newWindow) {
    chrome.runtime.sendMessage({
      type: 'newTab',
      payload: {
        url,
      },
    });
  } else {
    window.location.href = url;
  }
}

function tryLoad(urls, cb) {
  if (!hasEventListener) {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.err) {
        return cb(new Error('Could not load any url'));
      }

      cb(null, msg.url, msg.res);
    });

    hasEventListener = true;
  }

  chrome.runtime.sendMessage({
    type: 'fetch',
    payload: urls,
  });
}

function getResolverUrls(dataAttr) {
  const BASE_URL = 'https://github.com';
  const pluginName = dataAttr.pluginName;
  const resolver = pluginManager.getResolver(pluginName);

  if (!resolver) {
    return [];
  }

  chrome.runtime.sendMessage({
    type: 'track',
    payload: {
      category: 'resolver',
      action: 'invoke',
      label: pluginName,
    },
  });

  return [].concat(resolver(dataAttr)).map((url) => {
    if (!url) {
      return null;
    }

    if (typeof url === 'object') {
      return {
        url: url.url.replace('{BASE_URL}', BASE_URL),
        method: url.method,
      };
    }

    if (url.startsWith('{BASE_URL}') || url.startsWith(BASE_URL)) {
      return {
        url: url.replace('{BASE_URL}', BASE_URL),
      };
    }

    return {
      url: `https://githublinker.herokuapp.com/ping?url=${url}`,
      method: 'GET',
    };
  });
}

function onClick(event) {
  // ignore mouseup events on non-middle buttons
  // see https://github.com/OctoLinker/browser-extension/pull/173#issuecomment-243895366
  if (event.type === 'mouseup' && event.which !== 2) {
    return;
  }

  const dataAttr = event.currentTarget.dataset;
  const $tooltipTarget = $('span', event.currentTarget);

  showTooltip($tooltipTarget, PROCESS);

  const urls = getResolverUrls(dataAttr);

  if (!urls.length) {
    return;
  }

  tryLoad(urls, (err, url, res) => {
    if (err) {
      showTooltip($tooltipTarget, SORRY);

      return console.error(err); // eslint-disable-line no-console
    }

    showTooltip($tooltipTarget, RESOLVED);

    const newWindow = (storage.get('newWindow') || event.metaKey || event.ctrlKey || event.which === 2);
    openUrl((res || {}).url || url, newWindow);
  });
}

export default function (_pluginManager) {
  $body.undelegate(LINK_SELECTOR, 'click', onClick);
  $body.undelegate(LINK_SELECTOR, 'mouseup', onClick);

  $body.delegate(LINK_SELECTOR, 'click', onClick);
  $body.delegate(LINK_SELECTOR, 'mouseup', onClick);

  pluginManager = _pluginManager;
}
