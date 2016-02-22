import JavaScript from './grammar/javascript';

const grammarList = {
  JavaScript,
};

export default function LinkResolver(blobReader) {
  blobReader.forEach((blob) => {
    const Grammar = grammarList[blob.type];

    if (Grammar) {
      const grammar = new Grammar(blob);
      grammar.toString();
    }
  });
}
