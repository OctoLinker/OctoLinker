import relativeFile from './relative-file.js';

export default function ({ path, target }) {
  return [
    relativeFile({ path, target }),
    `https://github.com/Homebrew/homebrew-core/blob/master/Formula/${target}`,
  ];
}
