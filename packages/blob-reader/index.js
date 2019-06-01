import Blob from './blob';
import { getBlobWrapper } from './helper';

export default class BlobReader {
  hasBlobs() {
    return !!getBlobWrapper(document).length;
  }

  read(rootElement) {
    return getBlobWrapper(rootElement).map(el => new Blob(el));
  }
}
