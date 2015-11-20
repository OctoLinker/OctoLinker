import insertLink from './insert-link.js';

function getKeywords(text, _regex) {
  let regexList = _regex;
  const ret = {};

  if (!Array.isArray(regexList)) {
    regexList = [regexList];
  }

  let match;

  function findKeywords(val) {
    const startIndex = text.indexOf(val, match.index);
    ret[startIndex] = val;
  }

  regexList.forEach((regex) => {
    while (match = regex.exec(text)) { // eslint-disable-line no-cond-assign
      match.slice(1).map(findKeywords);
    }
  });

  return ret;
}

function blober(blob, options) {
  blob.lines.forEach((item) => {
    const keywords = getKeywords(item.text, options.regex);
    if (!keywords) {
      return;
    }

    insertLink(item.el, keywords, options);
  });
}

function main(blobs, options = {debug: false}) {
  blobs.forEach((blob) => {
    blober(blob, options);
  });
}

export {
  main as default,
};
