import { join, dirname } from 'path';

export default function ({ path, target }) {
  return 'https://github.com' + join(dirname(path), target);
}
