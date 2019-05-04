import $ from 'jquery';

function getBlobCodeInner(el) {
  return [].slice.call(el.getElementsByClassName('blob-code-inner'));
}

function getBlobWrapper(rootElement = document) {
  let ret = [].slice.call(
    rootElement.getElementsByClassName('js-blob-wrapper'),
  );

  if (!ret.length) {
    ret = [].slice.call(rootElement.getElementsByClassName('blob-wrapper'));
  }

  if (!ret.length) {
    ret = [].slice.call(rootElement.getElementsByClassName('highlight'));
  }

  return ret;
}

function mergeRepoAndFilePath(repoPath, filePath) {
  const repoUrl = repoPath
    .trim()
    .split('#')[0]
    .replace(/pull\/[0-9]+\/files/, 'blob')
    .split('..')[0];

  return `${repoUrl}/${filePath.trim()}`;
}

function isGist() {
  return !!document.querySelector('#gist-pjax-container');
}

function getParentSha() {
  // Pull request diff view
  const input = document.querySelector('[name="comparison_start_oid"]');

  if (input && input.value) {
    return input.value;
  }

  // Pull request diff for unauthenticated users
  const url = document.querySelector('.js-load-contents');
  if (url && url.dataset.contentsUrl) {
    return url.dataset.contentsUrl.match(/base_sha=([0-9a-z]+)/)[1];
  }

  // Commit diff view
  const el = document.querySelector('.sha-block .sha[data-hotkey]');

  return el ? el.textContent : null;
}

function getPath(el) {
  // When current page is a diff view get path from "View" button
  let rootSelector = el.parentElement.parentElement.querySelectorAll(
    '.file-actions a',
  );

  // When current diff blob is loaded on-demand get path from "View" button
  if (!rootSelector.length) {
    rootSelector = el.parentElement.parentElement.parentElement.querySelectorAll(
      '.file-actions a',
    );
  }

  let ret = $(rootSelector)
    .filter(function() {
      return (
        $(this)
          .text()
          .trim() === 'View file'
      );
    })
    .attr('href');

  if (!ret) {
    ret = $('.js-permalink-shortcut').attr('href');
  }

  // When current page is a gist, get path from blob name
  if (!ret && isGist()) {
    ret = $('.gist-blob-name', el.parentElement)
      .text()
      .trim();
    if (ret && !ret.startsWith('/')) {
      ret = `/${ret}`;
    }
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
      return parseInt(result[1], 10);
    }
  }

  // split diff view
  let lineNumber = $(el)
    .closest('td')
    .prev()
    .data('line-number');

  // unified diff view
  if (!lineNumber) {
    lineNumber = $(el)
      .closest('tr')
      .find('td')
      .data('line-number');
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
    value: el.textContent.replace(/\n/, ''),
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
  if (el.classList.contains('highlight')) {
    const issueCode = el.getElementsByTagName('pre');
    if (issueCode.length) {
      return issueCode[0].textContent.split(/\n/).map((line, index) => ({
        value: line,
        lineNumber: index + 1,
      }));
    }
  }

  return getBlobCodeInner(el)
    .map(readLine)
    .filter(line => !!line);
}

export { getPath, getBlobWrapper, readLines, getParentSha };
