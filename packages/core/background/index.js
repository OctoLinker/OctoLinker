chrome.runtime.onMessage.addListener(({ action }) => {
  if (action !== 'openSettings') return;

  chrome.runtime.openOptionsPage();
});

if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL('https://octolinker.now.sh/goodbye');
}
