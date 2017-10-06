import uuid from 'uuid';
import ChromePromise from 'chrome-promise';
import { options } from './options';

const chromep = new ChromePromise();
const store = {};
const defaults = {};

options.forEach(item => {
  if (item.sensitiveData) {
    return;
  }

  defaults[item.name] = item.defaultValue;
});

export const get = key => store[key];

export const set = async (key, value) => {
  const data = {
    [key]: value,
  };

  try {
    return await chromep.storage.sync.set(data);
  } catch (err) {
    return chromep.storage.local.set(data);
  }
};

export const load = async () => {
  let data;

  try {
    data = await chromep.storage.sync.get(null);
  } catch (err) {
    data = await chromep.storage.local.get(null);
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
};
