import $ from 'jquery';

function getBlobCodeInner(el) {
  return [].slice.call(el.getElementsByClassName('blob-code-inner'));
}

function getBlobWrapper() {
  return [].slice.call(document.getElementsByClassName('blob-wrapper'));
}

function getPath(el) {
  // When current page is a diff view get path from "View" button
  let ret = $('.file-actions a', el.parentElement).filter(function () {
    return $(this).text() === 'View';
  }).attr('href');

  if (!ret) {
    ret = $('.js-permalink-shortcut').attr('href');
  }

  return ret;
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
  return getBlobCodeInner(el).map(readLine).filter((line) => !!line);
}

export {
  getPath,
  getBlobWrapper,
  readLines,
};
