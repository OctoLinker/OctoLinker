import wrapElement from '../helper-wrap-element';
import JavaScript from './grammar/javascript';

const grammarList = {
  JavaScript,
};

function blober(blob, grammar) {
  blob.lines.forEach((item) => {
    const keywords = grammar.extractKeywords(item.text);
    if (!keywords) {
      return;
    }

    const {path, type} = blob;

    wrapElement(item.el, keywords, {
      type,
      path,
    });
  });
}

function main(blobs) {
  blobs.forEach((blob) => {
    const Grammar = grammarList[blob.type];

    if (Grammar) {
      blober(blob, new Grammar());
    }
  });
}

export {
  main as default,
};
