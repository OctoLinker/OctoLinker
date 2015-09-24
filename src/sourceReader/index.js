import $ from 'jquery';
import pageTypeFromUrl from 'github-page-type';

function buildSourceItem(el)  {
  const text = $(el).text();
  return {
    el,
    text,
  };
}

function findLines(blobEl) {
  const type = '';
  const linesEl = blobEl.getElementsByClassName('blob-code-inner');
  const lines = Array.prototype.map.call(linesEl, buildSourceItem);

  return {
    lines,
    type,
  };
}

export default function(currentPageUrl) {
  const pageType = pageTypeFromUrl(currentPageUrl);

  const blobs = document.getElementsByClassName('blob-wrapper');
  return Array.prototype.map.call(blobs, (el) => {
    return findLines(el, pageType);
  }).filter(obj => obj);
}
