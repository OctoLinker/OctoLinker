import { join, dirname } from 'path';

export default function ({ path, target, baseUrl = '{BASE_URL}' }) {
  return baseUrl + join(dirname(path), target);
}
