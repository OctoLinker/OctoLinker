import * as storage from '@octolinker/helper-settings';
import newTab from './newTab';
import fetchUrls from '../utils/fetch';

storage.load().then(() => {
  newTab();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type !== 'fetch') {
    return;
  }

  fetchUrls(request.urls)
    .then(res => {
      sendResponse(res);
    })
    .catch(() => {
      sendResponse();
    });

  return true;
});
