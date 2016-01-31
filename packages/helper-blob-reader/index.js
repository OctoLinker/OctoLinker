import $ from 'jquery';
import { languageByFilePath } from '../helper-file-type';

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

  return {
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
