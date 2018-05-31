import injection from 'github-injection';
import BlobReader from '@octolinker/blob-reader';
import insertLink from '@octolinker/helper-insert-link';
import * as storage from '@octolinker/helper-settings';
import notification from './notification';
import clickHandler from './click-handler';
import Plugins from './plugin-manager.js';
import debugMode from './debug-mode.js';
import * as loadPlugins from './load-plugins';

function initialize(self) {
  debugMode(storage.get('debugMode'));
  notification();

  self._blobReader = new BlobReader();
  self._pluginManager = new Plugins(loadPlugins);
}

function run(self) {
  if (!self._blobReader.hasBlobs()) {
    return false;
  }

  self._blobReader.read();

  let matches = [];
  self._blobReader.forEach(blob => {
    const plugins = self._pluginManager.get(blob.path, blob.el.classList);

    if (!plugins.length) {
      return;
    }

    plugins.forEach(plugin => {
      if (plugin.parseBlob) {
        matches = matches.concat(plugin.parseBlob(blob));
      } else if (plugin.getLinkRegexes) {
        [].concat(plugin.getLinkRegexes(blob)).forEach(regex => {
          matches = matches.concat(insertLink(blob, regex, plugin));
        });
      }
    });
  });

  matches = matches.filter(result => result !== undefined);

  clickHandler(matches);
}

export default class OctoLinkerCore {
  constructor(options) {
    initialize(this, options);
  }

  init() {
    injection(run.bind(null, this));
  }
}
