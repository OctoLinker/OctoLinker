import { showNotification } from '@octolinker/user-interface';

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

export const rateLimitExceeded = ({ isUnauthenticated, remainingTime }) => {
  const timeLeft = prettyTime(remainingTime);

  if (isUnauthenticated) {
    showNotification({
      type: 'warn',
      body: `OctoLinker exceed the GitHub API hourly limit for unauthenticated requests. You probably want to <a href="#" class="js-octolinker-open-settings">create a token</a> or wait ${timeLeft}.`,
    });
    return;
  }

  showNotification({
    type: 'warn',
    body: `OctoLinker exceed the GitHub API hourly limit. The rate limit will be reset in ${timeLeft}.`,
  });
};

export const needsTokenForPrivate = () => {
  showNotification({
    type: 'info',
    body:
      'OctoLinker needs a GitHub API token to retrieve repository metadata for private repositories. <a href="#" class="js-octolinker-open-settings">Create a token</a> to enable OctoLinker for all your private repositories. <a href="#" class="js-octolinker-open-settings">Disable OctoLinker for private repositories</a> to get rid of this notification.',
  });
};

export const tokenIsInvalid = () => {
  showNotification({
    type: 'error',
    body:
      'The token you provided is invalid. You must <a href="#" class="js-octolinker-open-settings">create a new token</a> before you can continue using OctoLinker.',
  });
};
