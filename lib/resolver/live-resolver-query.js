export default function ({ type, target }, redirect=false) {
  return {
    url: `https://githublinker.herokuapp.com/q/${type}/${target}` + (redirect ? '?redirect=1' : ''),
    method: 'GET',
  };
}
