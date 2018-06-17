export default function({ type, target }) {
  return `https://githublinker.herokuapp.com/q/${type}/${target}`;
}
