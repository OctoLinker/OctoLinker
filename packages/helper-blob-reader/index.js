import $ from 'jquery';
import { languageByFilePath } from '../helper-file-type';

function readLine(el) {
  // Each array element represents a single line.
  // Therefore we can get ride of the newline here.
  return $(el).text().replace(/\n/, '');
}

function readBlobLines($blob) {
  const $lines = $('.blob-code-inner', $blob);
  return Array.prototype.map.call($lines, readLine);
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
  const $blobs = $('.blob-wrapper');

  return $.map($blobs, (el) => {
    return getBlobMeta(el);
  });
}
