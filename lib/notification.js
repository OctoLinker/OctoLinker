import { showNotification } from './gh-interface';
import * as storage from './options/storage.js';

const pkgVersion = require('../package.json').version.split('.').slice(0, -1).join('.');

export default function () {
  const showUpdateNotification = storage.get('showUpdateNotification');

  if (!showUpdateNotification) {
    return;
  }

  const installedVersion = storage.get('version');

  storage.set('version', pkgVersion);

  if (installedVersion && installedVersion !== pkgVersion) {
    showNotification();
  }
}
