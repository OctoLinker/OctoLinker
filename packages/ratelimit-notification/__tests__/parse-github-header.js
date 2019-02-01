import { parse } from '../parse-github-header';

describe('parse-github-header', () => {
  it('parse', () => {
    const fakeHeader = new Map([
      ['x-ratelimit-limit', '10'],
      ['x-ratelimit-remaining', '20'],
      ['x-ratelimit-reset', '30'],
    ]);

    expect(parse(fakeHeader)).toEqual({
      rateLimitTotal: 10,
      rateLimitRemaining: 20,
      rateLimitReset: 30000,
    });
  });
});
