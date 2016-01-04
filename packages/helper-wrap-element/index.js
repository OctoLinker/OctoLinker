import $ from 'jquery';

const CLASS_NAME = 'octo-linker-link';

function createLinkElement(dataAttr = {}) {
  const linkEl = document.createElement('a');

  // Add css classes
  linkEl.classList.add(CLASS_NAME);

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

function insertLink(el, keywords, data = {}, fromIndex = 0) {
  let charIndex = fromIndex;

  if (isAlreadyWrapped(el)) {
    return charIndex;
  }

  Array.prototype.forEach.call(el.childNodes, (childEl) => {
    let child = childEl;

    if (child.childElementCount) {
      charIndex = insertLink(child, keywords, data, charIndex);
    } else {
      const keyword = keywords[charIndex];

      if (keyword) {
        const attr = Object.assign({}, data, {
          value: keyword,
        });

        if (child.textContent !== keyword) {
          child = child.parentNode;
        }

        $(child).wrap(createLinkElement(attr));
      }

      charIndex += child.textContent.length;
    }
  });

  return charIndex;
}

export {
  insertLink as default,
  CLASS_NAME,
};
