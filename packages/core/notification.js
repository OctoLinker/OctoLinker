import * as storage from '@octolinker/helper-settings';
import { showNotification } from '@octolinker/user-interface';

let notificationEl;
const { version, releaseDescription } = require('./package.json');

const displayVersion = version.replace('v', '');
const majorMinor = version.split('.').slice(0, -1).join('.');

export default async function () {
  const showUpdateNotification = storage.get('showUpdateNotification');

  if (!showUpdateNotification) {
    return;
  }

  const installedVersion = storage.get('version');

  storage.set('version', majorMinor);

  if (installedVersion && installedVersion !== majorMinor) {
    storage.set('showUpdateInfo', true);
  }

  if (storage.get('showUpdateInfo')) {
    const releaseUrl = `https://github.com/OctoLinker/OctoLinker/releases/tag/v${version}`;
    const body = `${releaseDescription} &ndash; see what's new in OctoLinker ${displayVersion}! <a href="${releaseUrl}" target="_blank" class="js-octolinker-release-link">Learn more</a>`;

    notificationEl = showNotification({
      body,
      id: 'update-info',
      type: 'info',
      clickHandler: () => {
        storage.set('showUpdateInfo', false);
      },
    });
  }
}
