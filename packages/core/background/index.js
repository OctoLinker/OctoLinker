import * as storage from '@octolinker/helper-settings';
import newTab from './newTab';

storage.load().then(() => {
  newTab();
});
