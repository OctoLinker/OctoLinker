import ghParse from 'github-url-from-git';

export default function ({ target }) {
  return ghParse(target);
}
