import wrapElement from '../helper-wrap-element';
import universalGrammar from './grammar/universal';

function blober(blob, grammar, options) {
  blob.lines.forEach((item) => {
    const keywords = grammar(item.text);
    if (!keywords) {
      return;
    }

    wrapElement(item.el, keywords, {}, options);
  });
}

function main(blobs, options = { debug: false }) {
  blobs.forEach((blob) => {
    const grammar = universalGrammar(blob.type);

    if (grammar) {
      blober(blob, grammar, options);
    }
  });
}

export {
  main as default,
};
