import Blob from './blob';
import { getBlobWrapper } from './helper';

export default class BlobReader {
  hasBlobs() {
    return !!getBlobWrapper().length;
  }

  read() {
    this._blobs = getBlobWrapper().map(el => new Blob(el));

    return this;
  }

  getBlobs() {
    return this._blobs;
  }
}
