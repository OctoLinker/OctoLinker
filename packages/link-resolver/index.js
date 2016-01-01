import wrapElement from '../helper-wrap-element';
import universalGrammar from './grammar/universal';

function blober(blob, grammar, options) {
  blob.lines.forEach((item) => {
    const keywords = grammar(item.text);
    if (!keywords) {
      return;
    }

    const {path, type} = blob;

    wrapElement(item.el, keywords, {
      type,
      path,
    }, options);
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
