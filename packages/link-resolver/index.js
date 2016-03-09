import JavaScript from './grammar/javascript';

const grammarList = {
  JavaScript,
};

export default {
  blobTypes: Object.keys(grammarList),
  run: (blob) => {
    new grammarList[blob.type](blob); // eslint-disable-line no-new
  },
};
