import {REQUIRE, REQUIRE_RESOLVE, IMPORT} from '../../helper-grammar-regex-collection/index.js';
import tryLoad from '../../helper-try-load';
import bulkUrls from '../../helper-bulk-url-builder';
import builtins from 'builtins';
import findAndReplaceDOMText from 'findandreplacedomtext';
import {registerHandler} from '../../helper-click-handler';
import $ from 'jquery';

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

function replaceKeywords(blob, regex) {
  function replace(portion, match) {

    const value = match[1].replace(/['|"]/g, '');

    let offset = 0;
    if (match[1].length !== value.length) {
      offset = 1;
    };

    const valueStartPos = match[0].indexOf(match[1]) + offset;
    const valueEndPos = valueStartPos + value.length;
    const portionEndPos = portion.indexInMatch + portion.text.length;

    if (valueStartPos === portion.indexInMatch) {
      const { type, path } = blob;

      if (portionEndPos === valueEndPos) {
        return createLinkElement(portion.text, { value, type, path });
      }

      let node = portion.node;
      while (!node.textContent.includes(match[1])) {
        node = node.parentNode;
      }

      if (node) {
        $(node).wrap(createLinkElement('', { value, type, path }));
      }
    }

    return portion.text;
  }

  regex.forEach((find) => {
    findAndReplaceDOMText(blob.el, {
      find,
      replace,
    });
  });
}

export default class JavaScript {

  constructor(blob) {
    registerHandler(this.constructor.name, this.clickHandler.bind(this));
    replaceKeywords(blob, [REQUIRE, REQUIRE_RESOLVE, IMPORT]);
  }

  clickHandler(data) {
    if (builtins.indexOf(data.value) > -1) {
      window.location.href = `https://nodejs.org/api/${data.value}.html`;
      return;
    }

    tryLoad(bulkUrls(data), (err, url) => {
      if (err) {
        return console.error(err);
      }

      if (url) {
        window.location.href = url;
      }
    });
  }
}
