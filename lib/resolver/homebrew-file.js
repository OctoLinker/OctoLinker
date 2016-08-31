import relativeFile from './relative-file.js';

export default function ({ path, target }) {
  return [
    relativeFile({ path, target }),
    '{BASE_URL}/Homebrew/homebrew-core/blob/master/Formula/' + target,
  ];
}
