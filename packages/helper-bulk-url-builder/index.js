import { join, dirname, extname } from 'path';

export default function (data) {
  let basePath = join(dirname(data.path), data.value);
  const list = [
    '.js',
    '/index.js',
    '',
  ];

  const fileExt = extname(basePath);
  if (fileExt) {
    basePath = basePath.replace(fileExt, '');
  }

  return list.map((item) => {
    return 'https://github.com' + basePath + item;
  });
}
