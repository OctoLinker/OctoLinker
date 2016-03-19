import JavaScript from './grammar/javascript';

const grammarList = {
  JavaScript,
};

export default class NPMmanifest {

  initialize() {

  }

  blobTypes() {
    return Object.keys(grammarList);
  }

  parseBlob(blob) {
    new grammarList[blob.type](blob); // eslint-disable-line no-new
  }
}
