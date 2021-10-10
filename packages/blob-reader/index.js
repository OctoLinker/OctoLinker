import Blob from './blob';
import {
  getBlobWrapper,
  getPath,
  readLines,
  getParentSha,
  isGist,
} from './helper';

function parseBlob(el) {
  const path = getPath(el);
  const lines = readLines(el);

  if (!lines.length) {
    return;
  }

  // Does not work if left side is empty (eg new files) https://github.com/OctoLinker/OctoLinker/commit/b97dfbfdbf3dee5f4836426e6dac6d6f473461db?diff=split#diff-e56633f72ecc521128b3db6586074d2c
  const isDiff =
    lines.filter(({ side }) => ['left', 'right'].includes(side)).length > 0;

  if (isDiff) {
    const diffLineFilter =
      (type) =>
      ({ side, ...rest }) => {
        if ([type, 'context'].includes(side)) {
          return { ...rest };
        }
      };

    const leftBlob = new Blob({
      el,
      path,
      lines: lines.map(diffLineFilter('left')).filter(Boolean),
      branch: getParentSha(),
      type: 'diffLeft',
    });

    const rightBlob = new Blob({
      el,
      path,
      lines: lines.map(diffLineFilter('right')).filter(Boolean),
      type: 'diffRight',
    });

    return [leftBlob, rightBlob];
  }

  let type = isGist() ? 'gist' : 'full';
  if (el.getElementsByTagName('pre').length) {
    type = 'snippet';
  }

  return new Blob({ el, path, lines, type });
}

export default class BlobReader {
  hasBlobs() {
    return !!getBlobWrapper(document).length;
  }

  read(rootElement) {
    return [].concat(
      ...getBlobWrapper(rootElement)
        .map((el) => parseBlob(el))
        .filter(Boolean),
    );
  }
}
