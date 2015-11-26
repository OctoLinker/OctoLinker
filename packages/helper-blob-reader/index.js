import $ from 'jquery';
import fileType from '@githublinker/filetype';

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

function getBlobPath(blobElement, basePath) {
  let ret = basePath;

  // When current page is a diff get path from the file description
  const filePath = $('.file-header', blobElement.parentElement).data('path');
  if (filePath) {
    ret += filePath;
  }

  return ret;
}

function getBlobMeta(blobElement, basePath) {
  const path = getBlobPath(blobElement, basePath);
  const type = fileType(path);
  const lines = readBlobLines(blobElement);

  return {
    lines,
    type,
    path,
  };
}

export default function(location = window.location.href) {
  let baseLocation = location;
  const $blobs = $('.blob-wrapper');

  // When current page is a diff get baseLocation from the commit description
  const branch = $('.commit .branches-list a').eq(0);
  if (branch.length) {
    const repoUrl = branch.attr('href');
    const branchName = branch.text();
    baseLocation = `${repoUrl}/blob/${branchName}/`;
  }

  return $.map($blobs, (el) => {
    return getBlobMeta(el, baseLocation);
  });
}
