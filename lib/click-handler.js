import $ from 'jquery';
import tryLoad from '../packages/try-load';
import { showTooltip } from './gh-interface.js';
import * as resolvers from './resolver/index.js';

const SORRY = 'I\'m sorry, unable to resolve this link  😱';
const PROCESS = 'Processing  ⏳';
const RESOLVED = 'Redirecting  🚀';

const LINK_SELECTOR = '.octo-linker-link';
const $body = $('body');
const resolverHandlers = new Map();

function openUrl(url, newWindow = false) {
  if (!url) {
    return;
  }

  window.open(url, newWindow ? '_blank' : '_self');
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
  const dataAttr = event.target.dataset;
  const $target = $(event.target);

  showTooltip($target, PROCESS);

  const urls = getResolverUrls(dataAttr);

  if (!urls.length) {
    return;
  }

  tryLoad(urls, (err, url, res) => {
    if (err) {
      showTooltip($target, SORRY);

      return console.error(err);
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
