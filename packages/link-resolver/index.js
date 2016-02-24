import JavaScript from './grammar/javascript';

const grammarList = {
  JavaScript,
};

export default class LinkResolver {
  run(blobReader) {
    blobReader.forEach((blob) => {
      const Grammar = grammarList[blob.type];

      if (Grammar) {
        const grammar = new Grammar(blob);
        grammar.toString();
      }
    });
  }
}
