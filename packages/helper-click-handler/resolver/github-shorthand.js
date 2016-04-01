import ghShorthand from 'github-url-from-username-repo';

export default function ({ target }) {
  return ghShorthand(target, true);
}
