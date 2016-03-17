import $ from 'jquery';

const CLASS_NAME = 'octo-linker-item';
const DEBUG_CLASS_NAME = 'octo-linker-item--debug-mode';

function wrapElement(child, keyword, options) {
  const $el = $(child);

  const linkElement = document.createElement('a');
  linkElement.classList.add(CLASS_NAME);

  if (options.debug) {
    linkElement.classList.add(DEBUG_CLASS_NAME);
  }

  $el.wrap(linkElement);
}

function isAlreadyWrapped(el) {
  return !!el.getElementsByClassName(CLASS_NAME).length;
}

function insertLink(el, keywords, options = {debug: false}, fromIndex = 0) {
  let charIndex = fromIndex;

  if (isAlreadyWrapped(el)) {
    return charIndex;
  }

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
