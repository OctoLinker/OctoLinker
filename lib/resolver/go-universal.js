import goFile from './go-file.js';

export default function ({ target, path }) {
  const isPath = !!target.match(/^\.\.?[\\|\/]?/);

  if (isPath) {
    return goFile({ path, target });
  }

  return [
    `https://${target}`,
    `https://golang.org/pkg/${target}`,
  ];
}
