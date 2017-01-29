import OctoLinker from './octo-linker.js';
import * as storage from './options/storage.js';

storage.load(() => {
  const octoLinker = new OctoLinker();
  octoLinker.init();
});
