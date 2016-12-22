function newTab(url, index) {
  chrome.tabs.create({
    url,
    index,
  });
}

export default () => {
  chrome.runtime.onMessage.addListener(({ type, payload }, sender) => {
    if (type !== 'newTab') return;

    newTab(payload.url, sender.tab.index + 1);
  });
};
