function $(selector, rootElement = document) {
  return rootElement.querySelector(selector);
}

function $$(selector, rootElement = document) {
  return [...rootElement.querySelectorAll(selector)];
}

function getBlobCodeInner(el) {
  return $$('.blob-code-inner');
}

function getBlobWrapper(rootElement) {
  return $$(
    rootElement,
    `
      .blob-wrapper,
      .js-blob-wrapper,
      [class*="highlight-source-"]
    `,
  );
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
  return !!$('#gist-pjax-container');
}

function getParentSha() {
  // Pull request diff view
  const input = $('[name="comparison_start_oid"]');

  if (input && input.value) {
    return input.value;
  }

  // Pull request diff for unauthenticated users
  const url = $('.js-load-contents');
  if (url && url.dataset.contentsUrl) {
    return url.dataset.contentsUrl.match(/base_sha=([0-9a-z]+)/)[1];
  }

  // Commit diff view
  const el = $('.sha-block .sha[data-hotkey]');

  return el ? el.textContent : null;
}

function getPath(el) {
  // When current page is a diff view get path from "View" button
  let rootSelector =
    el.parentElement.parentElement.querySelectorAll('.file-actions a');

  // When current diff blob is loaded on-demand get path from "View" button
  if (!rootSelector.length) {
    rootSelector =
      el.parentElement.parentElement.parentElement.querySelectorAll(
        '.file-actions a',
      );
  }

  let ret = $$(rootSelector)
    .find((element) => element.textContent.trim() === 'View file')
    ?.getAttribute('href');

  if (!ret) {
    ret = $('.js-permalink-shortcut')?.getAttribute('href');
  }

  // When current page is a gist, get path from blob name
  if (!ret && isGist()) {
    ret = $('.gist-blob-name', el.parentElement)?.textContent.trim();
    if (ret && !ret.startsWith('/')) {
      ret = `/${ret}`;
    }
  }

  // when page has pull request comment(s)
  const $fileHeader = $$('.file-header', el.parentElement);
  if (!ret && $fileHeader.length) {
    let repoPath = '';
    let filePath = '';

    if ($$('a.file-action', $fileHeader).length) {
      // comment is outdated

      filePath = $('.file-info', $fileHeader)?.textContent;
      repoPath = $('a.file-action', $fileHeader)?.getAttribute('href');
    } else {
      // comment is up-to-date

      filePath = $('a', $fileHeader)?.textContent;
      repoPath = $('a', $fileHeader)?.getAttribute('href');
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
  let lineNumber = el
    .closest('td')
    ?.previousElementSibling?.getAttribute('line-number');

  // unified diff view
  if (!lineNumber) {
    lineNumber = el
      .closest('tr')
      ?.querySelector('td')
      ?.getAttribute('line-number');
  }

  if (lineNumber) {
    if (Number.isInteger(lineNumber)) {
      return lineNumber;
    }
  }

  return null;
}

function diffMetaInformation(el) {
  const td = el.closest('td');

  // Blob view
  if (td.classList.contains('js-file-line')) {
    return {};
  }

  let side;

  // split diff
  if (td.cellIndex === 1) {
    side = 'left';
  } else if (td.cellIndex === 3) {
    side = 'right';
  }

  // unified diff
  if (!side && td.cellIndex === 2) {
    if (td.classList.contains('blob-code-addition')) {
      side = 'right';
    } else if (td.classList.contains('blob-code-deletion')) {
      side = 'left';
    } else if (td.classList.contains('blob-code-context')) {
      side = 'context';
    }
  }

  // Diff view
  return {
    side,
  };
}

function readLine(el) {
  const lineNumber = getLineNumber(el);

  if (!lineNumber) {
    return null;
  }

  // Ignore suggested code changes
  if (el.closest('.js-suggested-changes-blob')) {
    return null;
  }

  // Each array element represents a single line.
  // Therefore we can get ride of the newline here.
  const ret = {
    value: el.textContent.replace(/\n/, ''),
    lineNumber,
    ...diffMetaInformation(el),
  };

  return ret;
}

function readLines(el) {
  if (
    el.classList.contains('highlight') &&
    el.firstElementChild &&
    el.firstElementChild.nodeName === 'PRE'
  ) {
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
    .filter((line) => !!line);
}

export { getPath, getBlobWrapper, readLines, getParentSha, isGist };
