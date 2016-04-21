import $ from 'jquery';
import tryLoad from '../packages/try-load';
import { showTooltip } from './gh-interface.js';
import resolverAPI from './resolver/resolver-api.js';
import relativeFile from './resolver/relative-file.js';
import javascriptFile from './resolver/javascript-file.js';
import gitUrl from './resolver/git-url.js';
import githubShorthand from './resolver/github-shorthand.js';
import javascriptUniversal from './resolver/javascript-universal.js';

const SORRY = 'I\'m sorry, unable to resolve this link  😱';
const PROCESS = 'Processing  ⏳';
const RESOLVED = 'Redirecting  🚀';

const CLASS_NAME = 'octo-linker-link';
const LINK_SELECTOR = `.${CLASS_NAME}`;
const $body = $('body');
const listeners = new Map();
const clickHandlers = {
  resolverAPI,
  relativeFile,
  javascriptFile,
  javascriptUniversal,
  gitUrl,
  githubShorthand,
};

function openUrl(url, newWindow = false) {
  if (!url) {
    return;
  }

  window.open(url, newWindow ? '_blank' : '_self');
}

function onClick(event) {
  const dataAttr = event.target.dataset;
  const $target = $(event.target);

  showTooltip($target, PROCESS);

  const resolverStrings = dataAttr.resolver.replace(/\s/g, '').split('|');
  let urls = resolverStrings.map((resolverName) => {
    const func = listeners.get(resolverName);
    if (func) {
      return func(dataAttr);
    }
  });

  urls = []
    .concat(...urls)
    .filter((url) => !!url);

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

export function registerHandler([name, func]) {
  if (listeners.has(name)) {
    return;
  }

  listeners.set(name, func);
}

function init() {
  $body.delegate(LINK_SELECTOR, 'click', onClick);

  Object.entries(clickHandlers).forEach(registerHandler);
}

function cleanup() {
  $body.undelegate(LINK_SELECTOR, 'click', onClick);
  listeners.clear();
}

export default function () {
  cleanup();
  init();
}
