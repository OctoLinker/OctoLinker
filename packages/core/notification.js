import * as storage from '@octolinker/helper-settings';
import { showNotification } from '@octolinker/user-interface';

const pkgVersion = require('./package.json')
  .version.split('.')
  .slice(0, -1)
  .join('.');

const showPromo = function(promoVersion) {
  const lastpromoVersion = storage.get('promoVersion');

  storage.set('promoVersion', promoVersion);

  if (lastpromoVersion !== promoVersion) {
    const body = `<div style="display: grid; grid-template-columns: 60px auto;">
      <div>
        <img width="40" src="https://octolinker.now.sh/static/octolinker-small.png">
      </div>
      <div>
      We're super interested to learn what you think about <b>OctoLinker</b>!<br/>Please fill out this <a href="http://bit.ly/2lRJ7MB" target="_blank"><b>two questions</b></a> survey so that we can make it better!
      </div>
     </div>`;
    showNotification({ body });
  }
};

export default async function() {
  const showUpdateNotification = storage.get('showUpdateNotification');

  showPromo(2019);

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
    const description = (json.body && json.body.split('\n')[0]) || '';
    const url = json.html_url;
    const version = json.tag_name.replace('v', '');

    const body = `New in OctoLinker ${version}: <b>${description}</b> – <a href="${url}" target="_blank">Release Notes</a>`;

    showNotification({ body });
  }
}
