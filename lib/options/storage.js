import uuid from 'uuid';
import ChromePromise from 'chrome-promise';
import { options } from './options';

const chromep = new ChromePromise();
const store = {};
const defaults = {};

options.forEach((item) => {
  defaults[item.name] = item.defaultValue;
});

export const get = key => store[key];

export const set = (key, value) => {
  const data = {
    [key]: value,
  };

  // Firefox 51.0.1 doesn't have storage.sync, so wrap the property access in a
  // Promise so that the exception can be handled.
  return new Promise(resolve => resolve(chromep.storage.sync.set(data)))
    .catch(() => chromep.storage.local.set(data));
};

export const load = (cb) => {
  // Firefox 51.0.1 doesn't have storage.sync, so wrap the property access in a
  // Promise so that the exception can be handled.
  new Promise(resolve => resolve(chromep.storage.sync.get(null)))
  .catch(() => chromep.storage.local.get(null))
  .then((data) => {
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

    cb();
  });
};
