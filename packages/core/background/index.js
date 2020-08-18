import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(({ action }) => {
  if (action !== 'openSettings') return;

  browser.runtime.openOptionsPage();
});

if (browser.runtime.setUninstallURL) {
  browser.runtime.setUninstallURL('https://octolinker.now.sh/goodbye');
}
