import * as storage from '@octolinker/helper-settings';
import rateLimitNotification from '@octolinker/ratelimit-notification';

export default async function ({ user, repo, branch }) {
  const token = storage.get('githubToken');

  const headers = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  let response;
  try {
    response = await fetch(
      `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`,
      {
        method: 'GET',
        headers,
      },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  if (!response) return [];

  rateLimitNotification(response.headers, response.status);

  const json = await response.json();

  if (!json.tree) {
    return [];
  }

  return json.tree
    .filter(({ type }) => type === 'blob')
    .map(({ path }) => path);
}
