import * as storage from '@octolinker/helper-settings';
import { showNotification } from '@octolinker/user-interface';

let notificationEl;

document.body.addEventListener('click', event => {
  if (
    event.target.classList.contains('js-hide-update-notice') ||
    event.target.classList.contains('js-flash-close-update-notice')
  ) {
    storage.set('showUpdateNoticePermissionUpdate', false);
    if (notificationEl) {
      notificationEl.remove();
    }
  }
});

export default async function() {
  if (navigator.userAgent.includes('Firefox')) {
    return;
  }

  const showUpdateNoticePermissionUpdate = storage.get(
    'showUpdateNoticePermissionUpdate',
  );

  if (showUpdateNoticePermissionUpdate === false) {
    return;
  }

  const url = 'https://github.com/OctoLinker/OctoLinker/issues/870';

  const body = `<b>Important</b>: Our next release will ask for additional permission to access api.github.com. <a href="${url}" target="_blank" class="js-hide-update-notice">Why the change?</a>`;

  notificationEl = showNotification({ body, id: 'update-notice' });
}
