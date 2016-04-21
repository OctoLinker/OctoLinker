export default function ({ type, target }) {
  return {
    url: `https://githublinker.herokuapp.com/q/${type}/${target}`,
    method: 'GET',
  };
}
