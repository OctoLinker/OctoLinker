import $ from 'jquery';

function wrapElement(child, keyword, options) {
  const $el = $(child);
  let attr = '';
  if (options.debug) {
    attr = ' class="ghl-link--debug-mode"';
  }

  const linkElement = `<a${attr}>`;
  $el.wrap(linkElement);
}

function insertLink(el, keywords, options = {debug: false}, fromIndex = 0) {
  let charIndex = fromIndex;

  Array.prototype.forEach.call(el.childNodes, (child) => {
    if (child.childElementCount) {
      charIndex = insertLink(child, keywords, options, charIndex);
    } else {
      const keyword = keywords[charIndex];

      if (keyword) {
        wrapElement(child, keywords, options);
      }

      charIndex += child.textContent.length;
    }
  });

  return charIndex;
}

export {
  insertLink as default,
};
