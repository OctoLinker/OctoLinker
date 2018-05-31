import browser from 'webextension-polyfill';
import uuid from 'uuid';

const store = {};

const defaults = {
  newWindow: false,
  newWindowActive: true,
  showLinkIndicator: true,
  showUpdateNotification: true,
  doTrack: true,
};

export const get = key => store[key];

export const set = async (key, value) => {
  const data = {
    [key]: value,
  };

  try {
    return await browser.storage.sync.set(data);
  } catch (err) {
    return browser.storage.local.set(data);
  }
};

export const save = async data => {
  try {
    return await browser.storage.sync.set(data);
  } catch (err) {
    return browser.storage.local.set(data);
  }
};

export const load = async () => {
  let data;

  try {
    data = await browser.storage.sync.get(null);
  } catch (err) {
    data = await browser.storage.local.get(null);
  }

  Object.assign(store, defaults, data);

  if (!store.clientId) {
    store.clientId = uuid.v4();
    set('clientId', store.clientId);
  }

  for (const [key, value] of Object.entries(store)) {
    if (Object.keys(defaults).includes(key)) {
      chrome.runtime.sendMessage({
        type: 'track',
        payload: {
          category: 'options',
          action: key,
          label: value.toString(),
        },
      });
    }
  }

  return store;
};
