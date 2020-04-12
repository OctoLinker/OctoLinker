import * as storage from '@octolinker/helper-settings';
import { showNotification } from '@octolinker/user-interface';

let notificationEl;
const pkgVersion = require('./package.json')
  .version.split('.')
  .slice(0, -1)
  .join('.');

document.body.addEventListener('click', (event) => {
  if (
    event.target.classList.contains('js-hide-new-version') ||
    event.target.classList.contains('js-flash-close-update-info')
  ) {
    storage.set('showUpdateInfo', false);
    if (notificationEl) {
      notificationEl.remove();
    }
  }
});

export default async function () {
  const showUpdateNotification = storage.get('showUpdateNotification');

  if (!showUpdateNotification) {
    return;
  }

  const installedVersion = storage.get('version');

  storage.set('version', pkgVersion);

  if (installedVersion && installedVersion !== pkgVersion) {
    storage.set('showUpdateInfo', true);
  }

  if (storage.get('showUpdateInfo')) {
    const response = await fetch(
      'https://api.github.com/repos/OctoLinker/OctoLinker/releases/latest',
    );
    const json = await response.json();
    const description = (json.body && json.body.split('\n')[0]) || '';
    const url = json.html_url;
    const version = json.tag_name.replace('v', '');

    const body = `${description} &ndash; see what's new in OctoLinker ${version}! <a href="${url}" target="_blank" class="js-hide-new-version">Learn more</a>`;

    notificationEl = showNotification({ body, id: 'update-info' });
  }
}
