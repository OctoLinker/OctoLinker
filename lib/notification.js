import { showNotification } from './gh-interface';

let isNewVersion = false;
const pkgVersion = require('../package.json').version.split('.').slice(0, -1).join('.');

const installedVersion = window.localStorage.getItem('OctoLinkerVersion');
window.localStorage.setItem('OctoLinkerVersion', pkgVersion);

if (installedVersion !== pkgVersion) {
  isNewVersion = true;
}

export default function () {
  if (isNewVersion) {
    showNotification();
  }
}
