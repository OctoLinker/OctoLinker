import * as storage from '@octolinker/helper-settings';
import OctoLinker from './octo-linker.js';

storage.load().then(() => {
  const octoLinker = new OctoLinker();
  const a = 'a';
  octoLinker.init();
  const b = 'b';
});
