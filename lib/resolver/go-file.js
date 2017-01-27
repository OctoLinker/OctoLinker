import { join, dirname } from 'path';

export default function ({ path, target }) {
  const list = [];
  const basePath = join(dirname(path), target);
  const filename = target.slice(target.lastIndexOf('/') + 1);

  list.push(`/${filename}.go`);
  list.push('.go');
  list.push('');

  return list.map(file => `{BASE_URL}${basePath}${file}`);
}
