import rateLimitNotification from '@octolinker/ratelimit-notification';
import { get } from '@octolinker/helper-settings';
import fetchTree from '../fetch-tree';

jest.mock('@octolinker/ratelimit-notification', () => jest.fn());
jest.mock('@octolinker/helper-settings', () => ({
  get: jest.fn(),
}));

const response = JSON.stringify({
  tree: [
    { type: 'blob', path: 'foo.js' },
    { type: 'tree', path: 'src' },
    { type: 'blob', path: 'src/bar.js' },
  ],
});

const options = {
  user: 'octo',
  repo: 'cat',
  branch: 'tentacle',
};

describe('helper-github-api tree', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls the github tree api', async () => {
    fetch.mockResponseOnce(response);
    await fetchTree(options);

    expect(global.fetch).toBeCalledWith(
      'https://api.github.com/repos/octo/cat/git/trees/tentacle?recursive=1',
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );
  });

  it('calls the github tree api with an api token', async () => {
    fetch.mockResponseOnce(response);
    get.mockReturnValue('fake-token');
    await fetchTree(options);

    expect(global.fetch).toBeCalledWith(
      'https://api.github.com/repos/octo/cat/git/trees/tentacle?recursive=1',
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'token fake-token',
        },
      },
    );
  });

  it('returns an empty array on failure', async () => {
    fetch.mockResponseOnce(() => Promise.reject());

    expect(await fetchTree(options)).toEqual([]);
  });

  it('calls rateLimitNotification on success', async () => {
    const headers = new Headers();
    headers.append('foo', 'bar');
    headers.append('Content-Type', 'application/json');

    fetch.mockResponseOnce(response, {
      status: 201,
      headers,
    });
    await fetchTree(options);

    expect(rateLimitNotification).toBeCalledWith(headers, 201);
  });

  it('returns an array of files', async () => {
    fetch.mockResponseOnce(response);

    expect(await fetchTree(options)).toEqual(['foo.js', 'src/bar.js']);
  });
});
