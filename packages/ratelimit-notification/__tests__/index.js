import {
  removeAllNotifications,
  isPrivateRepository,
} from '@octolinker/user-interface';
import ratelimitNotification from '../index';
import {
  tokenIsInvalid,
  needsTokenForPrivate,
  rateLimitExceeded,
} from '../messages';
import { parse } from '../parse-github-header';

jest.mock('../parse-github-header', () => ({
  parse: jest.fn(),
}));

jest.mock('../messages');

jest.mock('@octolinker/user-interface');

parse.mockImplementation(() => ({
  rateLimitTotal: 10,
  rateLimitRemaining: 20,
  rateLimitReset: 30000,
}));

describe('ratelimitNotification', () => {
  it('removes all notifications', () => {
    ratelimitNotification();
    expect(removeAllNotifications).toHaveBeenCalled();
  });

  it('parse github header', () => {
    ratelimitNotification('fakeHeader');
    expect(parse).toHaveBeenCalledWith('fakeHeader');
  });

  describe('when status code is 401', () => {
    it('shows invalid token message', () => {
      ratelimitNotification('fakeHeader', 401);

      expect(tokenIsInvalid).toHaveBeenCalled();
    });
  });

  describe('when status code is 404', () => {
    it('shows needs private token message when repository is private', () => {
      isPrivateRepository.mockImplementation(() => true);
      ratelimitNotification('fakeHeader', 404);

      expect(needsTokenForPrivate).toHaveBeenCalled();
    });
  });

  describe('when status code is 403', () => {
    describe('when requests is unauthenticated', () => {
      it('shows needs private token message when repository is private', () => {
        isPrivateRepository.mockImplementation(() => true);
        parse.mockImplementation(() => ({
          rateLimitTotal: 60,
        }));

        ratelimitNotification('fakeHeader', 403);

        expect(needsTokenForPrivate).toHaveBeenCalled();
      });

      it('shows rate limit exceeded message', () => {
        isPrivateRepository.mockImplementation(() => false);
        parse.mockImplementation(() => ({
          rateLimitTotal: 60,
          rateLimitRemaining: 0,
        }));
        ratelimitNotification('fakeHeader', 403);

        expect(rateLimitExceeded).toHaveBeenCalled();
        expect(rateLimitExceeded).toHaveBeenCalledWith({
          isUnauthenticated: true,
          remainingTime: expect.any(Number),
        });
      });
    });

    describe('when requests is authenticated', () => {
      it('shows rate limit exceeded message', () => {
        isPrivateRepository.mockImplementation(() => false);
        parse.mockImplementation(() => ({
          rateLimitTotal: 5000,
          rateLimitRemaining: 0,
          rateLimitReset: 30000,
        }));

        ratelimitNotification('fakeHeader', 403);

        expect(rateLimitExceeded).toHaveBeenCalled();
        expect(rateLimitExceeded).toHaveBeenCalledWith({
          isUnauthenticated: false,
          remainingTime: expect.any(Number),
        });
      });
    });
  });
});
