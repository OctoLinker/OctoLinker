import { join } from 'path';

export default function ({ path, target }) {
  const basePath = join(path.split('/lib/')[0], 'lib');

  return `{BASE_URL}${join(basePath, `${target}.rb`)}`;
}
