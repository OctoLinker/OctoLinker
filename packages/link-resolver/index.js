import JavaScript from './grammar/javascript';

const grammarList = {
  JavaScript,
};

function main(blobs) {
  blobs.forEach((blob) => {
    const Grammar = grammarList[blob.type];

    if (Grammar) {
      const grammar = new Grammar(blob);
      grammar.toString();
    }
  });
}

export {
  main as default,
};
