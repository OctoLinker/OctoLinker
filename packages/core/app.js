import injection from 'github-injection';
import BlobReader from '@octolinker/blob-reader';
import insertLink from '@octolinker/helper-insert-link';
import * as storage from '@octolinker/helper-settings';
import helperSortUrls from '@octolinker/helper-sort-urls';
import normaliseResolverResults from '@octolinker/helper-normalise-resolver-results';
import Plugins from './plugin-manager.js';
import debugMode from './debug-mode.js';
import loader from './loader.js';
import * as loadPlugins from './load-plugins';
import './stats.js';

const blobReader = new BlobReader();
const pluginManager = new Plugins(loadPlugins);

async function run(rootElement) {
  const blobs = blobReader.read(rootElement);

  let matches = [];
  for (const blob of blobs) {
    const plugins = pluginManager.get(blob.path, blob.el.classList);

    if (plugins.length) {
      for (const plugin of plugins) {
        if (plugin.needsContext && blob.isDiff) {
          await blob.fetchBlob(); // eslint-disable-line no-await-in-loop
        }

        if (plugin.parseBlob) {
          matches = matches.concat(plugin.parseBlob(blob));
        } else if (plugin.getLinkRegexes) {
          for (const regex of [].concat(plugin.getLinkRegexes(blob))) {
            matches = matches.concat(insertLink(blob, regex, plugin));
          }
        }
      }
    }
  }

  matches = matches
    .filter((result) => result !== undefined)
    .map(({ link, urls }) => {
      const urlsSorted = helperSortUrls(urls, link.innerText);

      return {
        link,
        urls: normaliseResolverResults(urlsSorted),
      };
    });

  // Prefetch live resolver results in background
  (window.requestIdleCallback || setTimeout).bind(window)(() => {
    loader(matches);
  });
}

function watch(viewSpy) {
  const elements = [
    ...document.getElementsByClassName('js-diff-load-container'),
    ...document.getElementsByClassName('js-diff-progressive-container'),
  ];

  elements.forEach((element) => {
    viewSpy.observe(element, {
      childList: true,
    });
  });
}

function init() {
  debugMode(storage.get('debugMode'));

  injection(() => {
    if (!blobReader.hasBlobs()) {
      return false;
    }

    run(document);
  });

  const viewSpy = new MutationObserver((mutationRecords) => {
    mutationRecords.forEach((mutationRecord) => {
      if (mutationRecord.addedNodes.length > 0) {
        run(mutationRecord.target);
        watch(viewSpy);
      }
    });
  });

  document.body.addEventListener('click', (event) => {
    if (!event.target.closest('.js-expandable-line')) {
      return;
    }

    const expandDiffObserver = new MutationObserver((mutationRecords) => {
      mutationRecords.forEach((mutationRecord) => {
        if (mutationRecord.addedNodes.length > 0) {
          expandDiffObserver.disconnect();
          run(mutationRecord.target.closest('.js-file'));
        }
      });
    });

    expandDiffObserver.observe(event.target.closest('tbody'), {
      childList: true,
    });
  });

  watch(viewSpy);
}

storage.load().then(init);
