import Blob from './blob';
import { getBlobWrapper } from './helper';

export default class BlobReader {

  hasBlobs() {
    return !!getBlobWrapper().length;
  }

  read() {
    this._blobs = getBlobWrapper().map((el) => {
      return new Blob(el);
    });

    return this;
  }

  forEach(fn) {
    this._blobs.forEach(fn);
  }
}
