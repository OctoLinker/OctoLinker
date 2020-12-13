import browser from 'webextension-polyfill';

const store = {};

const defaults = {
  enablePrivateRepositories: true,
  showUpdateNotification: true,
  stats: {
    since: Date.now(),
    counter: 0,
  },
  enableBetterPHP: false,
};

function isTestEnv() {
  if (process.env.NODE_ENV === 'test') {
    return true;
  }

  if (
    typeof window !== 'undefined' &&
    /OctoLinker\/OctoLinker\/blob\/.+\/e2e\/fixtures/.test(
      window.location.pathname,
    )
  ) {
    return true;
  }

  return false;
}

export const get = (key) => {
  if (process.env.OCTOLINKER_LIVE_DEMO) {
    return;
  }

  if (isTestEnv() && key === 'enableBetterPHP') {
    return true;
  }

  return store[key];
};

export const set = async (key, value) => {
  if (process.env.OCTOLINKER_LIVE_DEMO) {
    return;
  }

  const data = {
    [key]: value,
  };

  Object.assign(store, data);

  return browser.storage.local.set(data);
};

export const save = async (data) => {
  if (process.env.OCTOLINKER_LIVE_DEMO) {
    return;
  }

  return browser.storage.local.set(data);
};

export const load = async () => {
  let data = {};

  if (!process.env.OCTOLINKER_LIVE_DEMO) {
    data = await browser.storage.local.get(null);
  }

  Object.assign(store, defaults, data);

  return store;
};
