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

function getCaptureGroupIndex(captureGroup) {
  const match = captureGroup.match(/^\$([0-9]+)/);
  if (!match || !match[1]) {
    return undefined;
  }

  return parseInt(match[1], 10);
}

function getCaptureGroupValue(match, captureGroup) {
  const index = getCaptureGroupIndex(captureGroup);
  if (index === undefined) {
    return undefined;
  }

  return match[index];
}

function buildDataAttr(data, match) {
  const dataAttr = {};
  for (const [key, value] of Object.entries(data)) {
    const index = getCaptureGroupValue(match, value);
    if (index) {
      dataAttr[key] = index.replace(/['|"]/g, '');
    } else {
      dataAttr[key] = value;
    }
  }

  return dataAttr;
}

function getIndexes(portion, entireMatch, matchValue) {
  let matchValueStriped = matchValue;

  let offset = 0;
  if (matchValue.length !== matchValue.replace(/['|"]/g, '').length) {
    offset = 1;
  }

  const removeQuotes = offset === 1;
  if (removeQuotes) {
    matchValueStriped = matchValueStriped.replace(/['|"]/g, '');
  }

  const valueStartPos = entireMatch.indexOf(matchValue) + offset;
  const valueEndPos = valueStartPos + matchValueStriped.length;
  const portionEndPos = portion.indexInMatch + portion.text.length;

  return {
    valueStartPos,
    valueEndPos,
    portionEndPos,
  };
}

function replace(portion, match, dataAttr, captureGroup) {
  const isAlreadyWrapped = portion.node.parentNode.classList.contains(CLASS_NAME);

  if (isAlreadyWrapped) {
    return portion.text;
  }

  const matchValue = getCaptureGroupValue(match, captureGroup);
  const { valueStartPos, valueEndPos, portionEndPos } = getIndexes(portion, match[0], matchValue);

  if (valueStartPos === portion.indexInMatch) {
    const dataAttrObject = buildDataAttr(dataAttr, match);

    if (portionEndPos === valueEndPos) {
      return createLinkElement(portion.text, dataAttrObject);
    }

    let node = portion.node;
    while (!node.textContent.includes(matchValue)) {
      node = node.parentNode;
    }

    if (node) {
      $(node).wrap(createLinkElement('', dataAttrObject));
    }
  }

  return portion.text;
}

export default function (el, regex, mapping, captureGroup = '$1') {
  if (!(el instanceof HTMLElement)) {
    throw new Error('must be called with a DOM element');
  }

  if (!(regex instanceof RegExp)) {
    throw new Error('must be called with a RegExp');
  }

  if (!mapping) {
    throw new Error('must be called with a mapping object');
  }

  findAndReplaceDOMText(el, {
    find: regex,
    replace: (portion, match) => replace(portion, match, mapping, captureGroup),
  });
}
