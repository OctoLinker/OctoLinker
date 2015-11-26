import wrapElement from '../helper-wrap-element';
import { getGrammarByType } from './grammar';

function blober(blob, grammar, options) {
  blob.lines.forEach((item) => {
    const keywords = grammar(item.text);
    if (!keywords) {
      return;
    }

    wrapElement(item.el, keywords, options);
  });
}

function main(blobs, options = {debug: false}) {
  blobs.forEach((blob) => {
    const grammar = getGrammarByType(blob.type);

    if (grammar) {
      blober(blob, grammar, options);
    }
  });
}

export {
  main as default,
};
