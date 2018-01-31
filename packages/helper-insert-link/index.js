import $ from 'jquery';
import findAndReplaceDOMText from 'findandreplacedomtext';
import * as storage from '@octolinker/helper-settings';
import './style.css';

const CLASS_NAME = 'octolinker-link';
const CLASS_INDICATOR = 'octolinker-line-indicator';
const QUOTE_SIGNS = '"\'';

function createLinkElement(text) {
  const linkEl = document.createElement('a');
  const spanEl = document.createElement('span');

  linkEl.appendChild(spanEl);

  // Set link text
  spanEl.textContent = text;

  // Add css classes
  linkEl.classList.add(CLASS_NAME);

  if (storage.get('showLinkIndicator')) {
    linkEl.classList.add(CLASS_INDICATOR);
  }

  return linkEl;
}

function getCaptureGroupIndex(captureGroup) {
  if (!captureGroup) {
    return undefined;
  }

  const match = captureGroup.match(/\$([0-9]+)/);
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

  return captureGroup.replace(new RegExp(`\\$${index}`, 'g'), match[index]);
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

function getQuoteAtPos(str, pos) {
  const sign = str.charAt(pos);

  if (QUOTE_SIGNS.includes(sign)) {
    return sign;
  }

  return '';
}

function wrapClosestElement(node, matchValue) {
  let currentNode = node;

  while (!currentNode.textContent.includes(matchValue)) {
    currentNode = currentNode.parentNode;
  }

  if (currentNode) {
    return $(currentNode).wrap(createLinkElement(''));
  }
}

function wrapsInnerString(text, matchValue) {
  const parent = document.createElement('span');
  const [leftSide, rightSide] = text.split(matchValue);
  const openingQuote = getQuoteAtPos(matchValue, 0);
  const closingQuote = getQuoteAtPos(matchValue, matchValue.length - 1);
  const linkText = matchValue.slice(
    openingQuote ? 1 : 0,
    closingQuote ? matchValue.length - 1 : undefined,
  );

  if (leftSide) parent.appendChild(document.createTextNode(leftSide));
  if (openingQuote) parent.appendChild(document.createTextNode(openingQuote));
  parent.appendChild(createLinkElement(linkText));
  if (closingQuote) parent.appendChild(document.createTextNode(closingQuote));
  if (rightSide) parent.appendChild(document.createTextNode(rightSide));
  return parent;
}

function replace(portion, match, captureGroup) {
  const { text, node, indexInMatch } = portion;
  const isAlreadyWrapped = (node.parentNode.parentNode || node.parentNode
  ).classList.contains(CLASS_NAME);
  if (isAlreadyWrapped) {
    return {
      isMatch: false,
      node: text,
      link: null,
    };
  }

  const matchValue = getCaptureGroupValue(match, captureGroup);

  if (node.textContent.includes(matchValue)) {
    const el = wrapsInnerString(text, matchValue);

    return {
      isMatch: true,
      node: el,
      link: el.querySelector('a'),
    };
  }

  const { valueStartPos, valueEndPos, portionEndPos } = getIndexes(
    portion,
    match[0],
    matchValue,
  );

  if (valueStartPos === indexInMatch) {
    if (portionEndPos === valueEndPos) {
      const el = createLinkElement(text);
      return {
        isMatch: true,
        node: el,
        link: el,
      };
    }

    return {
      isMatch: true,
      node: text,
      link: wrapClosestElement(node, matchValue)
        .closest(`a.${CLASS_NAME}`)
        .get(0),
    };
  }

  return {
    isMatch: false,
    node: text,
    link: null,
  };
}

export default function(el, regex, mapping, captureGroup = '$1') {
  if (!(el instanceof HTMLElement)) {
    throw new Error('must be called with a DOM element');
  }

  if (!(regex instanceof RegExp)) {
    throw new Error('must be called with a RegExp');
  }

  if (!mapping) {
    throw new Error('must be called with a mapping object');
  }

  const matches = [];

  findAndReplaceDOMText(el, {
    find: regex,
    replace: (portion, match) => {
      const { isMatch, node, link } = replace(portion, match, captureGroup);

      if (!isMatch) {
        return node;
      }

      matches.push({
        link,
        data: buildDataAttr(mapping, match),
      });

      return node;
    },
  });

  return matches;
}
