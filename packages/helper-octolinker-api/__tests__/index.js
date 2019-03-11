import { bulkAction } from '../index';

const response = JSON.stringify({
  result: [
    {
      target: 'bar',
      type: 'npm',
      result: 'https://github.com/foo/bar',
    },
    {
      target: 'i-do-not-exist',
      type: 'npm',
    },
  ],
});

const data = [
  {
    target: 'https://developer.mozilla.org/',
    type: 'ping',
  },
  {
    registry: 'npm',
    target: 'jquery',
    type: 'registry',
  },
  {
    registry: 'npm',
    target: 'i-do-not-exist',
    type: 'registry',
  },
];

describe('helper-octolinker-api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls the octolinker api', async () => {
    fetch.mockResponseOnce(response);
    await bulkAction(data);

    expect(global.fetch).toBeCalledWith('https://octolinker.now.sh/api', {
      method: 'POST',
      body: expect.any(String),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('sends a request payload', async () => {
    fetch.mockResponseOnce(response);
    await bulkAction(data);

    expect(global.fetch.mock.calls[0][1].body).toMatchSnapshot();
  });

  it('returns the result property from the response', async () => {
    fetch.mockResponseOnce(response);

    expect(await bulkAction(data).result).toBe(response.result);
  });

  it('returns an empty array on failure', async () => {
    fetch.mockResponseOnce(() => new Promise((resolve, reject) => reject()));

    expect(await bulkAction(data)).toEqual([]);
  });
});
