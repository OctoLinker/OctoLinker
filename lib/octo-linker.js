import injection from 'github-injection';
import notification from './notification';
import BlobReader from '../packages/blob-reader';
import clickHandler from './click-handler';
import Plugins from './plugin-manager.js';
import insertLink from './insert-link';
import debugMode from './debug-mode.js';
import loadPlugins from './load-plugins';
import * as storage from './options/storage.js';


function initialize(self) {
  debugMode(storage.get('debugMode'));
  notification();

  self._blobReader = new BlobReader();
  self._pluginManager = new Plugins(loadPlugins());
  clickHandler(self._pluginManager);
}

function run(self) {
  if (!self._blobReader.hasBlobs()) {
    return false;
  }

  self._blobReader.read();

  self._blobReader.forEach((blob) => {
    const plugins = self._pluginManager.get(blob.path, blob.el.classList);

    if (!plugins.length) {
      return;
    }

    plugins.forEach((plugin) => {
      if (plugin.parseBlob) {
        plugin.parseBlob(blob);
      } else if (plugin.getLinkRegexes) {
        [].concat(plugin.getLinkRegexes(blob)).forEach((regex) => {
          insertLink(blob.el, regex, {
            pluginName: plugin.name,
            target: '$1',
            path: blob.path,
          });
        });
      }
    });
  });
}

export default class OctoLinkerCore {
  constructor(options) {
    initialize(this, options);
  }

  init() {
    injection(run.bind(null, this));
  }
}
