import {
  removeAllNotifications,
  isPrivateRepository,
} from '@octolinker/user-interface';
import * as storage from '@octolinker/helper-settings';

import {
  tokenIsInvalid,
  needsTokenForPrivate,
  rateLimitExceeded,
} from './messages';
import { parse } from './parse-github-header';

const MAX_UNAUTHENTICATED_REQUESTS = 60;

document.body.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-octolinker-open-settings')) {
    chrome.runtime.sendMessage({ action: 'openSettings' });
  }
});

export default (headers, statusCode) => {
  const { rateLimitTotal, rateLimitRemaining, rateLimitReset } = parse(headers);

  removeAllNotifications();

  const isUnauthenticated = rateLimitTotal === MAX_UNAUTHENTICATED_REQUESTS;
  const isPrivate = isPrivateRepository();

  if (statusCode === 401) {
    return tokenIsInvalid();
  }

  if (isPrivate && !storage.get('enablePrivateRepositories')) {
    return;
  }

  if (isPrivate && statusCode === 404) {
    return needsTokenForPrivate();
  }

  if (statusCode === 403) {
    if (isPrivate && isUnauthenticated) {
      return needsTokenForPrivate();
    }
    const remainingTime = rateLimitReset - new Date().getTime();

    if (rateLimitRemaining === 0) {
      return rateLimitExceeded({ isUnauthenticated, remainingTime });
    }
  }
};
