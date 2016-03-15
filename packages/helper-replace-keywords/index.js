import $ from 'jquery';
import findAndReplaceDOMText from 'findandreplacedomtext';

const CLASS_NAME = 'octo-linker-link';

function createLinkElement(text, dataAttr = {}) {
  const linkEl = document.createElement('span');

  // Set link text
  linkEl.innerHTML = text;

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

function getIndexFromString(str) {
  const result = str.match(/^\$([0-9]+)/);
  if (!result || !result[1]) {
    return undefined;
  }

  return parseInt(result[1], 10);
}

function replace(portion, match, mapping) {
  const isAlreadyWrapped = portion.node.parentNode.classList.contains(CLASS_NAME);

  if (isAlreadyWrapped) {
    return portion.text;
  }

  const dataAttr = {};
  for (const [key, value] of Object.entries(mapping)) {
    const index = getIndexFromString(value);
    if (index) {
      dataAttr[key] = match[index];
    } else {
      dataAttr[key] = value;
    }
  }

  const removeQuotes = true;
  if (removeQuotes) {
    dataAttr.value = dataAttr.value.replace(/['|"]/g, '');
  }

  let offset = 0;
  if (match[1].length !== dataAttr.value.length) {
    offset = 1;
  }

  const valueStartPos = match[0].indexOf(match[1]) + offset;
  const valueEndPos = valueStartPos + dataAttr.value.length;
  const portionEndPos = portion.indexInMatch + portion.text.length;


  if (valueStartPos === portion.indexInMatch) {
    if (portionEndPos === valueEndPos) {
      return createLinkElement(portion.text, dataAttr);
    }

    let node = portion.node;
    while (!node.textContent.includes(match[1])) {
      node = node.parentNode;
    }

    if (node) {
      $(node).wrap(createLinkElement('', dataAttr));
    }
  }

  return portion.text;
}

export default function (el, regex, mapping) {
  if (!(el instanceof HTMLElement)) {
    throw new Error('must be called with a DOM element');
  }

  if (!(regex instanceof RegExp)) {
    throw new Error('must be called with a RegExp');
  }

  if (!mapping) {
    throw new Error('must be called with a mapping object');
  }

  if (!mapping.value) {
    throw new Error('mapping.value is required');
  }

  findAndReplaceDOMText(el, {
    find: regex,
    replace: (portion, match) => replace(portion, match, mapping),
  });
}
