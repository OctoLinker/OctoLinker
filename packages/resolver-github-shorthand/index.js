import ghShorthand from 'github-url-from-username-repo';

export default function ({ target }) {
  target = target.replace(/^github\:/, '');
  return ghShorthand(target.replace(/^https:\/\/github.com\//, ''), true);
}
