import $ from 'jquery';
import { showTooltip } from './gh-interface.js';
import * as resolvers from './resolver/index.js';

const SORRY = 'I\'m sorry, unable to resolve this link  😱';
const PROCESS = 'Processing  ⏳';
const RESOLVED = 'Redirecting  🚀';

const LINK_SELECTOR = '.octo-linker-link';
const $body = $('body');
const resolverHandlers = new Map();

let hasEventListener = false;

function openUrl(url, newWindow = false) {
  if (!url) {
    return;
  }

  window.open(url, newWindow ? '_blank' : '_self');
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
    urls,
  });
}

function getResolverUrls(dataAttr) {
  const resolverStrings = dataAttr.resolver.replace(/\s/g, '').split('|');

  const urls = resolverStrings.map((resolverName) => {
    const resolver = resolverHandlers.get(resolverName);
    if (resolver) {
      return resolver(dataAttr);
    }
  });

  return []
    .concat(...urls)
    .filter((url) => !!url);
}

function onClick(event) {
  const dataAttr = event.currentTarget.dataset;
  const $target = $(event.currentTarget);

  showTooltip($target, PROCESS);

  const urls = getResolverUrls(dataAttr);

  if (!urls.length) {
    return;
  }

  tryLoad(urls, (err, url, res) => {
    if (err) {
      showTooltip($target, SORRY);

      return console.error(err); // eslint-disable-line no-console
    }

    showTooltip($target, RESOLVED);

    const newWindow = (event.metaKey || event.ctrlKey || event.which === 2);
    openUrl((res || {}).url || url, newWindow);
  });
}

export default function () {
  $body.undelegate(LINK_SELECTOR, 'click', onClick);
  resolverHandlers.clear();

  $body.delegate(LINK_SELECTOR, 'click', onClick);
  Object.entries(resolvers).forEach(([name, func]) => {
    if (resolverHandlers.has(name)) {
      return;
    }

    resolverHandlers.set(name, func);
  });
}
