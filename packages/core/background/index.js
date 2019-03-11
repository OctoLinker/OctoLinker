import * as storage from '@octolinker/helper-settings';
import newTab from './newTab';

storage.load().then(() => {
  newTab();
});

chrome.runtime.onMessage.addListener(({ action }) => {
  if (action !== 'openSettings') return;

  chrome.runtime.openOptionsPage();
});
