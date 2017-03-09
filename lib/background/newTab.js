function newTab(url, index, active) {
  chrome.tabs.create({
    url,
    index,
    active,
  });
}

export default () => {
  chrome.runtime.onMessage.addListener(({ type, payload }, sender) => {
    if (type !== 'newTab') return;

    newTab(payload.url, sender.tab.index + 1, payload.active);
  });
};
