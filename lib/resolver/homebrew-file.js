import relativeFile from './relative-file.js';

export default function ({ path, target }) {
  return [
    relativeFile({ path, target, baseUrl: 'https://github.com' }),
    'https://github.com/Homebrew/homebrew-core/blob/master/Formula/' + target,
  ];
}
