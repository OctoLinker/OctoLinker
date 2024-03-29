import './style.css';
import findAndReplaceDOMText from 'findandreplacedomtext';
import getPosition from './get-position.js';

const CLASS_NAME = 'octolinker-link';

let isDiffViewUnified;

function createLinkElement() {
  const linkEl = document.createElement('a');

  linkEl.dataset.pjax = 'true';
  linkEl.classList.add(CLASS_NAME);

  return linkEl;
}

function injectUrl(node, value, startOffset, endOffset) {
  let el;
  // Take quote marks into account to narrow down match
  // in case value is given on the left and right hand side
  if (startOffset > 0) {
    startOffset -= 1;
  }
  const textMatch = node.textContent.slice(startOffset, endOffset + 1).trim(); // we don't want to include whitespace in the link

  try {
    findAndReplaceDOMText(node, {
      find: textMatch,
      replace: (portion) => {
        if (el || !portion.text.includes(value)) {
          return portion.text;
        }

        el = createLinkElement();
        el.textContent = portion.text;

        return el;
      },
    });

    // Prevent's GitHub's code navigation styling from being applied to our links
    el.parentElement.setAttribute('clickadded', 'false');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  if (!el && node.textContent.includes(textMatch)) {
    el = createLinkElement();

    let currentOffset = 0;
    [...node.childNodes].forEach((child) => {
      if (
        currentOffset >= startOffset &&
        currentOffset <= endOffset &&
        textMatch.includes(child.textContent)
      ) {
        if (!el.childElementCount) {
          node.appendChild(el);
        }
        el.appendChild(child);
      } else {
        node.appendChild(child);
      }

      currentOffset += child.textContent.length;
    });
  }

  return el;
}

export default function (blob, regex, plugin, meta = {}) {
  if (!blob) {
    throw new Error('must be called with a blob');
  }

  if (!plugin) {
    throw new Error('must be called with a plugin');
  }

  if (!(regex instanceof RegExp)) {
    throw new Error('must be called with a RegExp');
  }

  const matches = [];

  getPosition(blob.toString(), regex).forEach(
    ({
      lineNumber,
      startPos,
      endPos,
      startPosInBlob,
      endPosInBlob,
      values,
    }) => {
      let urls = plugin.resolve(blob.path, values, meta, regex);
      if (Array.isArray(urls)) {
        urls = urls.filter(Boolean);
      }

      const lineNumberInBlob = lineNumber + blob.firstLineNumber - 1;

      let el;
      if (blob.isDiff) {
        let lineRootEl = blob.el.querySelector(
          blob.lineSelector(lineNumberInBlob),
        );

        // When line number exsists in both left and right diff
        if (lineRootEl) {
          if (isDiffViewUnified === undefined) {
            isDiffViewUnified =
              lineRootEl.parentElement.childElementCount === 3;
          }

          // TODO make unified diff view working again
          if (isDiffViewUnified && blob.type === 'diffLeft') {
            // When diff view is unified, the target element is the third sibling
            lineRootEl = lineRootEl.nextElementSibling;
          }

          lineRootEl = lineRootEl.nextElementSibling;
          el = lineRootEl.querySelector('.blob-code-inner') || lineRootEl;
        }
      } else {
        el = blob.el.querySelector(blob.lineSelector(lineNumberInBlob));
      }

      if (!el) {
        return;
      }

      if (blob.isSnippet) {
        startPos = startPosInBlob;
        endPos = endPosInBlob;
      }

      const retEl = injectUrl(el, values[0], startPos, endPos);
      if (retEl) {
        matches.push({
          link: retEl,
          urls,
        });
      }
    },
  );

  return matches;
}
