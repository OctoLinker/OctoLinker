const store = {};

const defaults = {
  enablePrivateRepositories: true,
  showUpdateNotification: true,
};

export const save = () => {};
export const get = () => {};
export const set = () => {};

export const load = async () => {
  // Clear legacy storage strategy without migration
  // Can be removed at the end of April 2019

  Object.assign(store, defaults);

  return store;
};
