import { join, dirname } from 'path';

export default function ({ path, target }) {
  return `{BASE_URL}${join(dirname(path), target)}`;
}
