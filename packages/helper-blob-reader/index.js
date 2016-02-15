import $ from 'jquery';
import { languageByFilePath } from '../helper-file-type';

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

function readBlobLines($blob) {
  const linesEl = $blob.getElementsByClassName('blob-code-inner');
  return Array.prototype.map.call(linesEl, readLine).filter((line) => !!line);
}

function getBlobPath(blobElement) {
  // When current page is a diff view get path from "View" button
  let ret = $('.file-actions a', blobElement.parentElement).filter(function () {
    return $(this).text() === 'View';
  }).attr('href');

  if (!ret) {
    ret = $('.js-permalink-shortcut').attr('href');
  }

  return ret;
}

function getBlobMeta(blobElement) {
  const path = getBlobPath(blobElement);

  if (!path) {
    return null;
  }

  const type = languageByFilePath(path);
  const lines = readBlobLines(blobElement);

  return {
    lines,
    el: blobElement,
    type,
    path,
  };
}

export default function () {
  const blobs = document.getElementsByClassName('blob-wrapper');

  return $.map(blobs, (el) => {
    return getBlobMeta(el);
  });
}
