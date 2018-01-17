import * as storage from '@octolinker/helper-settings';
import OctoLinker from './octo-linker.js';

storage.load().then(() => {
  const octoLinker = new OctoLinker();
  octoLinker.init();
});
