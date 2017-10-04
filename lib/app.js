import 'core-js/fn/object/entries';
import OctoLinker from './octo-linker.js';
import * as storage from './options/storage.js';
import './app.css';

storage.load().then(() => {
  const octoLinker = new OctoLinker();
  octoLinker.init();
});
