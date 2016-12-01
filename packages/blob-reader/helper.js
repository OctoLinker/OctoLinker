import $ from 'jquery';

function getBlobCodeInner(el) {
  return [].slice.call(el.getElementsByClassName('blob-code-inner'));
}

function getBlobWrapper() {
  return [].slice.call(document.getElementsByClassName('blob-wrapper'));
}

function mergeRepoAndFilePath(repoPath, filePath) {
  const repoUrl = repoPath.trim().split('#')[0].replace(/pull\/[0-9]+\/files/, 'blob');

  return `${repoUrl}/${filePath.trim()}`;
}

function isGist() {
  return !!document.querySelector('#gist-pjax-container');
}

function getPath(el) {
  // When current page is a diff view get path from "View" button
  let ret = $('.file-actions a', el.parentElement.parentElement).filter(function () {
    return $(this).text() === 'View';
  }).attr('href');

  if (!ret) {
    ret = $('.js-permalink-shortcut').attr('href');
  }

  // When current page is a gist, get path from blob name
  if (!ret && isGist()) {
    ret = $('.gist-blob-name', el.parentElement).text();
  }

  // when page has pull request comment(s)
  const $fileHeader = $('.file-header', el.parentElement);
  if (!ret && $fileHeader.length) {
    let repoPath = '';
    let filePath = '';

    if ($('a.file-action', $fileHeader).length) {
      // comment is outdated

      filePath = $('.file-info', $fileHeader).text();
      repoPath = $('a.file-action', $fileHeader).attr('href');
    } else {
      // comment is up-to-date

      filePath = $('a', $fileHeader).text();
      repoPath = $('a', $fileHeader).attr('href');
    }

    if (repoPath && filePath) {
      ret = mergeRepoAndFilePath(repoPath, filePath);
    }
  }

  return ret ? ret.trim() : undefined;
}

function getLineNumber(el) {
  // blob view
  if (el.id) {
    const result = /^LC?([0-9]+)$/.exec(el.id);
    if (result && result[1]) {
      return result[1];
    }
  }

  // split diff view
  let lineNumber = $(el).closest('td').prev().data('line-number');

  // unified diff view
  if (!lineNumber) {
    lineNumber = $(el).closest('tr').find('td').data('line-number');
  }

  if (lineNumber) {
    if (Number.isInteger(lineNumber)) {
      return lineNumber;
    }
  }

  return null;
}

function diffMetaInformation(el) {
  const $td = $(el).closest('td');
  return {
    deletion: $td.hasClass('blob-code-deletion'),
    addition: $td.hasClass('blob-code-addition'),
  };
}

function readLine(el) {
  const lineNumber = getLineNumber(el);

  if (!lineNumber) {
    return null;
  }

  const { deletion, addition } = diffMetaInformation(el);

  // Each array element represents a single line.
  // Therefore we can get ride of the newline here.
  const ret = {
    value: el.innerText.replace(/\n/, ''),
    lineNumber,
  };

  if (deletion) {
    ret.deletion = deletion;
  }

  if (addition) {
    ret.addition = addition;
  }

  return ret;
}

function readLines(el) {
  return getBlobCodeInner(el).map(readLine).filter(line => !!line);
}

export {
  getPath,
  getBlobWrapper,
  readLines,
};
