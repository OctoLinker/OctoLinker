import { join } from 'path';

export default function ({ path, target }) {
  const basePath = join(path.split('/lib/')[0], 'lib');

  return 'https://github.com' + join(basePath, target + '.rb');
}
