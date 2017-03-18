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
    fetch('https://api.github.com/repos/octolinker/browser-extension/releases/latest')
      .then(response => response.json())
      .then(json => ({
        description: json.body.split('\n')[0],
        url: json.html_url,
        version: json.tag_name.replace('v', ''),
      }))
      .then(({ description, url, version }) => {
        showNotification({ description, url, version });
      });
  }
}
