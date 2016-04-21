export default function ({ target }) {
  return {
    url: `https://githublinker.herokuapp.com/ping?url=${target}`,
    method: 'GET',
  };
}
