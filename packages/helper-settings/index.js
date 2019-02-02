import browser from 'webextension-polyfill';

const store = {};

const defaults = {
  showLinkIndicator: true,
  showUpdateNotification: true,
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

  return store;
};
