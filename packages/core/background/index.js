chrome.runtime.onMessage.addListener(({ action }) => {
  if (action !== 'openSettings') return;

  chrome.runtime.openOptionsPage();
});
