import Blob from './blob';
import { getBlobWrapper } from './helper';

export default class BlobReader {
  constructor() {
    this._blobs = [];
  }

  hasBlobs() {
    return !!getBlobWrapper(document).length;
  }

  read(rootElement) {
    return getBlobWrapper(rootElement).map(el => new Blob(el));
  }
}
