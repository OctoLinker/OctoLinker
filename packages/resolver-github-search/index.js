export default function ({ path, target }) {
  return {
    type: 'github-search',
    path,
    target,
  };
}
