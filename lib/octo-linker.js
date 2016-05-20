import injection from 'github-injection';
import notification from './notification';
import BlobReader from '../packages/blob-reader';
import clickHandler from './click-handler';
import PluginManager from './plugin-manager.js';
import debugMode from './debug-mode.js';
import JavaScript from './plugins/javascript';
import NpmManifest from './plugins/npm-manifest';
import BowerManifest from './plugins/bower-manifest';
import GemfileManifest from './plugins/gemfile-manifest';
import HomebrewManifest from './plugins/homebrew-manifest';
import ComposerManifest from './plugins/composer-manifest';
import Ruby from './plugins/ruby';

function initialize(self) {
  debugMode(false);
  clickHandler();
  notification();

  self._blobReader = new BlobReader();
  self._pluginManager = new PluginManager([
    JavaScript,
    NpmManifest,
    BowerManifest,
    GemfileManifest,
    HomebrewManifest,
    ComposerManifest,
    Ruby,
  ]);
}

function run(self) {
  if (!self._blobReader.hasBlobs()) {
    return false;
  }

  self._blobReader.read();

  self._blobReader.forEach((blob) => {
    const plugins = self._pluginManager.get(blob.path);

    if (!plugins.length) {
      return;
    }

    plugins.forEach((plugin) => {
      plugin.parseBlob(blob);
    });
  });
}

export default class OctoLinkerCore {
  constructor() {
    initialize(this);
  }

  init() {
    injection(window, run.bind(null, this));
  }
}
