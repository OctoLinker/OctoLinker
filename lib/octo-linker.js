import injection from 'github-injection';
import BlobReader from '../packages/blob-reader';
import clickHandler from './click-handler';
import getPluginsForBlobType from './plugin-manager.js';
import debugMode from './debug-mode.js';

function initialize(self) {
  debugMode(true);
  clickHandler();

  self._blobReader = new BlobReader();
}

function run(self) {
  if (!self._blobReader.hasBlobs()) {
    return false;
  }

  console.time('total');

  self._blobReader.read();

  self._blobReader.forEach((blob) => {
    const pluginsForType = getPluginsForBlobType(blob.type);
    if (!pluginsForType) {
      return;
    }

    pluginsForType.forEach((plugin) => {
      plugin.parseBlob(blob);
    });
  });

  console.timeEnd('total');
}

export default class OctoLinkerCore {
  constructor() {
    initialize(this);
  }

  init() {
    injection(window, run.bind(null, this));
  }
}
