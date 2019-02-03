import * as storage from '@octolinker/helper-settings';
import newTab from './newTab';

storage.load().then(() => {
  newTab();
});

chrome.runtime.onMessage.addListener(({ action }) => {
  if (action !== 'openSettings') return;

  const optionsUrl = chrome.extension.getURL('options.html');

  chrome.tabs.query({ url: optionsUrl }, tabs => {
    if (tabs.length) {
      chrome.tabs.update(tabs[0].id, { active: true });
    } else {
      chrome.tabs.create({ url: optionsUrl });
    }
  });
});
