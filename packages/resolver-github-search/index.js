import { extname } from 'path';
import * as storage from '@octolinker/helper-settings';

export default function({ path, target }) {
  const [, user, repo] = path.split('/');
  const extension = extname(target);

  let params = `q=${target}+in:path+filename:${target}+repo:${user}/${repo}`;
  if (extension) {
    params += `+extension:${extension}`;
  }

  const token = storage.get('githubToken');
  if (token) {
    params += `&access_token=${token}`;
  }

  const url = `https://api.github.com/search/code?${params}`;

  return async function githubSearch() {
    const response = await fetch(url);
    const json = await response.json();

    return json.items[0].html_url;
  };
}
