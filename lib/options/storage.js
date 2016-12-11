import { options } from './options';

const store = {};
const defaults = {};

options.forEach((item) => {
  defaults[item.name] = item.defaultValue;
});

export const load = (cb) => {
  (chrome.storage.sync || chrome.storage.local).get(null, (data) => {
    Object.assign(store, defaults, data);

    for (const [key, value] of Object.entries(store)) {
      chrome.runtime.sendMessage({
        type: 'track',
        payload: {
          category: 'options',
          action: key,
          label: value.toString(),
        },
      });
    }

    cb();
  });
};

export const get = key => store[key];

export const set = (key, value) => {
  (chrome.storage.sync || chrome.storage.local).set({
    [key]: value,
  });
};
