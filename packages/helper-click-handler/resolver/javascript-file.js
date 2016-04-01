import { join, dirname, extname } from 'path';

export default function ({ path, target }) {
  const list = [];
  const extName = ['.js', '.jsx', '.json'];
  let basePath = join(dirname(path), target);
  const pathExt = extname(path);
  const fileExt = extname(basePath);

  if (fileExt) {
    basePath = basePath.replace(fileExt, '');
  }

  if (pathExt && !extName.includes(pathExt)) {
    extName.unshift(pathExt);
  }

  if (fileExt && !extName.includes(fileExt)) {
    extName.unshift(fileExt);
  }

  extName.forEach((ext) => {
    list.push(ext);
    list.push(`/index${ext}`);
  });

  list.push('');

  return list.map((file) => {
    return 'https://github.com' + basePath + file;
  });
}
