import { join } from 'path';

export default function ({ path, target }) {
  return 'https://github.com' + join(path, target + '.rb');
}
