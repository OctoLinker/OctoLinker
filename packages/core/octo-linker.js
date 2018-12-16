import $ from 'jquery';
import injection from 'github-injection';
import BlobReader from '@octolinker/blob-reader';
import insertLink from '@octolinker/helper-insert-link';
import * as storage from '@octolinker/helper-settings';
import helperSortUrls from '@octolinker/helper-sort-urls';
import normaliseResolverResults from '@octolinker/helper-normalise-resolver-results';
import notification from './notification';
import clickHandler from './click-handler';
import Plugins from './plugin-manager.js';
import debugMode from './debug-mode.js';
import loader from './loader.js';
import * as loadPlugins from './load-plugins';

function initialize(self) {
  debugMode(storage.get('debugMode'));
  notification();

  self._blobReader = new BlobReader();
  self._pluginManager = new Plugins(loadPlugins);
}

async function run(self) {
  if (!self._blobReader.hasBlobs()) {
    return false;
  }

  self._blobReader.read();

  let matches = [];
  for (const blob of self._blobReader.getBlobs()) {
    const plugins = self._pluginManager.get(blob.path, blob.el.classList);

    if (plugins.length) {
      for (const plugin of plugins) {
        if (plugin.needsContext && blob.isDiff) {
          await blob.fetchBlob(); // eslint-disable-line no-await-in-loop
          await blob.fetchParentBlob(); // eslint-disable-line no-await-in-loop
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
    .filter(result => result !== undefined)
    .map(({ link, urls }) => {
      const urlsSorted = helperSortUrls(urls, link.innerText);

      return {
        link,
        urls: normaliseResolverResults(urlsSorted),
      };
    });

  // Prefetch live resolver results in background
  requestIdleCallback(() => {
    loader(matches);
  });

  clickHandler(matches);
}

function waitFor(el, cb) {
  const viewSpy = new MutationObserver(() => {
    cb();
  });

  viewSpy.observe(el, {
    childList: true,
  });
}

export default class OctoLinkerCore {
  constructor(options) {
    initialize(this, options);
  }

  init() {
    injection(run.bind(null, this));

    $('.js-expand').on('click', event => {
      waitFor($(event.target).closest('tbody')[0], run.bind(null, this));
    });
  }
}
