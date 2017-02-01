import { join, dirname, extname } from 'path';

export default function ({ path, target }) {
  const list = [];
  const extName = ['.js', '.jsx', '.ts', '.tsx', '.json'];
  const basePath = join(dirname(path), target);
  const pathExt = extname(path);

  if (pathExt && !extName.includes(pathExt)) {
    extName.unshift(pathExt);
  }

  extName.forEach((ext) => {
    list.push(ext);
    list.push(`/index${ext}`);
  });

  list.push('');

  return list.map(file => `{BASE_URL}${basePath}${file}`);
}
