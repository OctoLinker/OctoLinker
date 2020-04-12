import { extname } from 'path';

export default function (urls, fileName) {
  const fileExtension = extname(fileName);

  if (!fileExtension || !Array.isArray(urls)) {
    return urls;
  }

  function prioSort(fileExt, memo, file) {
    const index = typeof file === 'string' && file.endsWith(fileExt) ? 0 : 1;
    memo[index].push(file);

    return memo;
  }

  return [].concat(
    ...urls.reduce(prioSort.bind(null, fileExtension), [[], []]),
  );
}
