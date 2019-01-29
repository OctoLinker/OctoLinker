import { showNotification } from '@octolinker/user-interface';
import {
  tokenIsInvalid,
  needsTokenForPrivate,
  rateLimitExceeded,
} from '../messages';

jest.mock('@octolinker/user-interface');

describe('ratelimit-notification', () => {
  it('tokenIsInvalid', () => {
    const showNotificationStub = jest.fn();
    showNotification.mockImplementation(showNotificationStub);

    tokenIsInvalid();
    expect(showNotificationStub.mock.calls[0][0]).toMatchSnapshot();
  });
  it('needsTokenForPrivate', () => {
    const showNotificationStub = jest.fn();
    showNotification.mockImplementation(showNotificationStub);

    needsTokenForPrivate();
    expect(showNotificationStub.mock.calls[0][0]).toMatchSnapshot();
  });

  describe('rateLimitExceeded', () => {
    it('for authenticated requests', () => {
      const showNotificationStub = jest.fn();
      showNotification.mockImplementation(showNotificationStub);

      rateLimitExceeded({ isUnauthenticated: false, remainingTime: 5000 });
      expect(showNotificationStub.mock.calls[0][0]).toMatchSnapshot();
    });

    it('for unauthenticated requests', () => {
      const showNotificationStub = jest.fn();
      showNotification.mockImplementation(showNotificationStub);

      rateLimitExceeded({ isUnauthenticated: true, remainingTime: 300000 });
      expect(showNotificationStub.mock.calls[0][0]).toMatchSnapshot();
    });
  });
});
