import 'babel-polyfill';
import injection from 'github-injection';
import clickHandler from '../helper-click-handler';
import BlobReader from '../blob-reader';

import LinkResolver from '../plugin-link-resolver';
import ManifestNPM from '../plugin-manifest-npm';

function enableDebugMode() {
  document.body.classList.add('octo-linker-debug');
}

const plugins = [
  LinkResolver,
  ManifestNPM,
];

function createPluginCacheList() {
  const cache = new Map();

  plugins.forEach((PluginClass) => {
    const pluginInstance = new PluginClass();

    pluginInstance.blobTypes().forEach((type) => {
      const caller = cache.get(type) || [];
      caller.push(pluginInstance);

      if (!cache.has(type)) {
        cache.set(type, caller);
      }
    });
  });

  return cache;
}

function initialize(self) {
  enableDebugMode();
  clickHandler();

  self._blobReader = new BlobReader();
  self._plugins = createPluginCacheList();
}

function run(self) {
  if (!self._blobReader.hasBlobs()) {
    return false;
  }

  console.time('total');

  self._blobReader.read();

  self._blobReader.forEach((blob) => {
    self._plugins.get(blob.type).forEach((plugin) => {
      if (!plugin._isActive) {
        plugin.initialize();
        plugin._isActive = true;
      }

      plugin.parseBlob(blob);
    });
  });

  console.timeEnd('total');
}

class OctoLinkerCore {
  constructor() {
    initialize(this);
  }

  init() {
    injection(window, run.bind(null, this));
  }
}

const octoLinkerCore = new OctoLinkerCore();
octoLinkerCore.init();
