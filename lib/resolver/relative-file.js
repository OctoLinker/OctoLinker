import { posix, dirname } from 'path';

export default function({ path, target }) {
  return `{BASE_URL}${posix.join(dirname(path), target)}`;
}
