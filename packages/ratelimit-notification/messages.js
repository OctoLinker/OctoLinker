import browser from 'webextension-polyfill';
import * as storage from '@octolinker/helper-settings';
import { showNotification } from '@octolinker/user-interface';

const oneDay = 86400000;

const prettyTime = (ms) => {
  const sec = ms / 1000;

  if (sec > 120) {
    return `${Math.round(sec / 60)} minutes`;
  }
  if (sec > 60) {
    return `${Math.round(sec / 60)} minute`;
  }

  return `${sec} seconds`;
};

function isSettingsLink(event) {
  return event.target.classList.contains('js-octolinker-open-settings');
}

function settingsClickHandler(event) {
  if (isSettingsLink(event)) {
    browser.runtime.sendMessage({ action: 'openSettings' });
  }
}

export const rateLimitExceeded = ({
  isUnauthenticated,
  remainingTime,
  rateLimitReset,
}) => {
  if (Date.now() < storage.get('rateLimitReset')) {
    return;
  }

  const timeLeft = prettyTime(remainingTime);
  const rateLimitClickHandler = (event) => {
    settingsClickHandler(event);
    if (!isSettingsLink(event)) {
      storage.set('rateLimitReset', rateLimitReset);
    }
  };

  if (isUnauthenticated) {
    showNotification({
      clickHandler: rateLimitClickHandler,
      type: 'warn',
      body: `OctoLinker exceed the GitHub API hourly limit for unauthenticated requests. You probably want to <a href="#" class="js-octolinker-open-settings">create a token</a> or wait ${timeLeft}.`,
    });
    return;
  }

  showNotification({
    clickHandler: rateLimitClickHandler,
    type: 'warn',
    body: `OctoLinker exceed the GitHub API hourly limit. The rate limit will be reset in ${timeLeft}.`,
  });
};

export const needsTokenForPrivate = () => {
  if (Date.now() < storage.get('privateRepoReset')) {
    return;
  }

  showNotification({
    clickHandler: (event) => {
      settingsClickHandler(event);
      if (!isSettingsLink(event)) {
        storage.set('privateRepoReset', Date.now() + oneDay);
      }
    },
    type: 'info',
    body: 'OctoLinker needs a GitHub API token to retrieve repository metadata for private repositories. <a href="#" class="js-octolinker-open-settings">Create a token</a> to enable OctoLinker for all your private repositories. <a href="#" class="js-octolinker-open-settings">Disable OctoLinker for private repositories</a> to get rid of this notification.',
  });
};

export const tokenIsInvalid = () => {
  if (Date.now() < storage.get('tokenInvalidReset')) {
    return;
  }

  showNotification({
    clickHandler: (event) => {
      settingsClickHandler(event);
      if (!isSettingsLink(event)) {
        storage.set('tokenInvalidReset', Date.now() + oneDay);
      }
    },
    type: 'error',
    body: 'The token you provided is invalid. You must <a href="#" class="js-octolinker-open-settings">create a new token</a> before you can continue using OctoLinker.',
  });
};
