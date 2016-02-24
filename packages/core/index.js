import 'babel-polyfill';
import injection from 'github-injection';
import clickHandler from '../helper-click-handler';
import BlobReader from '../helper-blob-reader';

import LinkResolver from '../link-resolver';

function enableDebugMode() {
  document.body.classList.add('octo-linker-debug');
}

function initialize(self) {
  enableDebugMode();
  clickHandler();

  self._blobReader = new BlobReader();
  self._linkResolver = new LinkResolver();
}

function run(self) {
  if (!self._blobReader.hasBlobs()) {
    return false;
  }

  self._blobReader.read();
  self._linkResolver.run(self._blobReader);
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
