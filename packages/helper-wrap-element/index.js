import $ from 'jquery';

const CLASS_NAME = 'octo-linker-link';
const DEBUG_CLASS_NAME = 'octo-linker-link--debug-mode';

function createLinkElement(dataAttr = {}, options = {}) {
  const linkEl = document.createElement('a');

  // Add css classes
  linkEl.classList.add(CLASS_NAME);
  if (options.debug) {
    linkEl.classList.add(DEBUG_CLASS_NAME);
  }

  // Add data-* attributes
  for (const key in dataAttr) {
    if (dataAttr.hasOwnProperty(key)) {
      linkEl.dataset[key] = dataAttr[key];
    }
  }

  return linkEl;
}

function isAlreadyWrapped(el) {
  return !!el.getElementsByClassName(CLASS_NAME).length;
}

function insertLink(el, keywords, data = {}, options = {}, fromIndex = 0) {
  let charIndex = fromIndex;

  if (isAlreadyWrapped(el)) {
    return charIndex;
  }

  Array.prototype.forEach.call(el.childNodes, (child) => {
    if (child.childElementCount) {
      charIndex = insertLink(child, keywords, data, options, charIndex);
    } else {
      const keyword = keywords[charIndex];

      if (keyword) {
        const attr = Object.assign({}, data, {
          value: keyword,
        });

        $(child).wrap(createLinkElement(attr, options));
      }

      charIndex += child.textContent.length;
    }
  });

  return charIndex;
}

export {
  insertLink as default,
};
