import $ from 'jquery';
import fileType from '../helper-file-type';

function readLine(el) {
  const text = $(el).text();
  return {
    el,
    text,
  };
}

function readBlobLines($blob) {
  const $lines = $('.blob-code-inner', $blob);
  return Array.prototype.map.call($lines, readLine);
}

function getBlobPath(blobElement) {
  // When current page is a diff view get path from "View" button
  let ret = $('.file-actions a', blobElement.parentElement).filter(function() {
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

  const type = fileType(path);
  const lines = readBlobLines(blobElement);

  return {
    lines,
    type,
    path,
  };
}

export default function() {
  const $blobs = $('.blob-wrapper');

  return $.map($blobs, (el) => {
    return getBlobMeta(el);
  });
}
