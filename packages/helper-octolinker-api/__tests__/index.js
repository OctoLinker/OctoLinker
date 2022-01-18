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
  {
    registry: 'go',
    target: 'jquery',
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

    expect(global.fetch).toBeCalledWith(expect.any(URL), {
      method: 'GET',
      body: undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('sends a GET request', async () => {
    fetch.mockResponseOnce(response);
    await bulkAction(data);

    expect(global.fetch.mock.calls[0][1].method).toEqual('GET');
    expect(global.fetch.mock.calls[0][1].body).toEqual(undefined);
    expect(global.fetch.mock.calls[0][0].href).toEqual(
      'https://octolinker-api.now.sh/?ping=https%3A%2F%2Fdeveloper.mozilla.org%2F&npm=jquery%2Ci-do-not-exist&go=jquery',
    );
  });

  it('sends a POST request if payload is too big for a GET request', async () => {
    const payload = new Array(300)
      .fill({
        registry: 'npm',
        target: 'foo',
        type: 'registry',
      })
      .map((item, index) => ({ ...item, target: item.target + index }));

    fetch.mockResponseOnce(response);
    await bulkAction(payload);

    expect(global.fetch.mock.calls[0][1].method).toEqual('POST');
    expect(global.fetch.mock.calls[0][1].body).toMatchSnapshot();
    expect(global.fetch.mock.calls[0][0].href).toEqual(
      'https://octolinker-api.now.sh/',
    );
  });

  it('returns the result property from the response', async () => {
    fetch.mockResponseOnce(response);

    expect(await bulkAction(data).result).toBe(response.result);
  });

  it('returns an empty array on failure', async () => {
    fetch.mockResponseOnce(() => Promise.reject());

    expect(await bulkAction(data)).toEqual([]);
  });
});
