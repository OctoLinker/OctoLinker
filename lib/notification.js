import { showNotification } from './gh-interface';
import * as storage from './options/storage.js';

const pkgVersion = require('../package.json').version.split('.').slice(0, -1).join('.');

export default function () {
  let isNewVersion = false;

  const installedVersion = storage.get('version') || window.localStorage.getItem('OctoLinkerVersion');

  // Remove this in after three releases (v4.8)
  if (window.localStorage.getItem('OctoLinkerVersion')) {
    window.localStorage.removeItem('OctoLinkerVersion');
  }

  storage.set('version', pkgVersion);

  if (installedVersion && installedVersion !== pkgVersion) {
    isNewVersion = true;
  }

  if (isNewVersion) {
    showNotification();
  }
}
