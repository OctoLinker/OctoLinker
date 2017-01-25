export default function ({ target }) {
  return [
    `https://${target}`,
    `https://golang.org/pkg/${target}`,
  ];
}
