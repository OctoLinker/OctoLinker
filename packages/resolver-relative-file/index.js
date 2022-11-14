import { dirname, posix } from 'path';

const { join } = posix;

export default function ({ path, target }) {
  return `{BASE_URL}${join(dirname(path), target)}`;
}
