import 'babel-polyfill';
import injection from 'github-injection';
import clickHandler from '../helper-click-handler';
import BlobReader from '../helper-blob-reader';

import LinkResolver from '../link-resolver';

function enableDebugMode() {
  document.body.classList.add('octo-linker-debug');
}

const plugins = [
  LinkResolver,
];

function createPluginCacheList() {
  const cache = new Map();

  plugins.forEach((plugin) => {
    plugin.blobTypes.forEach((type) => {
      const caller = cache.get(type) || [];
      caller.push(plugin.run);

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

  self._blobReader.read();

  self._blobReader.forEach((blob) => {
    self._plugins.get(blob.type).forEach((plugin) => {
      plugin(blob);
    });
  });
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
