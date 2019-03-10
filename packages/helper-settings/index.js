import browser from 'webextension-polyfill';

const store = {};

const defaults = {
  newWindow: false,
  newWindowActive: true,
  showLinkIndicator: true,
  showUpdateNotification: true,
};

export const get = key => store[key];

export const set = async (key, value) => {
  const data = {
    [key]: value,
  };

  return browser.storage.local.set(data);
};

export const save = async data => browser.storage.local.set(data);

export const load = async () => {
  // Clear legacy storage strategy without migration
  // Can be removed at the end of April 2019
  await browser.storage.sync.clear();

  const data = await browser.storage.local.get(null);

  Object.assign(store, defaults, data);

  return store;
};
