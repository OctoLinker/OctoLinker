import { showNotification } from './gh-interface';
import * as storage from './options/storage.js';

const pkgVersion = require('../package.json')
  .version.split('.')
  .slice(0, -1)
  .join('.');

export default async function() {
  const showUpdateNotification = storage.get('showUpdateNotification');

  if (!showUpdateNotification) {
    return;
  }

  const installedVersion = storage.get('version');

  storage.set('version', pkgVersion);

  if (installedVersion && installedVersion !== pkgVersion) {
    const response = await fetch(
      'https://api.github.com/repos/OctoLinker/OctoLinker/releases/latest',
    );
    const json = await response.json();
    const description = json.body.split('\n')[0];
    const url = json.html_url;
    const version = json.tag_name.replace('v', '');
    showNotification({ description, url, version });
  }
}
