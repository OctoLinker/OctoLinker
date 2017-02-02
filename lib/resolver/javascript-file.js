import { join, dirname, extname } from 'path';

function resolve({ path, target }) {
  const list = [];
  const extName = ['.js', '.jsx', '.ts', '.tsx', '.json'];
  const basePath = join(dirname(path), target);
  const pathExt = extname(path);
  const fileExt = extname(basePath);

  if (extName.includes(fileExt)) {
    return resolve({
      path,
      target: target.replace(fileExt, ''),
    });
  }

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

export default resolve;
