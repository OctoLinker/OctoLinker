import JavaScript from './grammar/javascript';

const grammarList = {
  JavaScript,
};

function main(blobReader) {
  blobReader.forEach((blob) => {
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
