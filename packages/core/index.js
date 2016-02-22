import 'babel-polyfill';
import injection from 'github-injection';
import clickHandler from '../helper-click-handler';
import BlobReader from '../helper-blob-reader';

import linkResolver from '../link-resolver';

function main() {
  document.body.classList.add('octo-linker-debug');

  const blobReader = new BlobReader();

  if (!blobReader.hasBlobs()) {
    return;
  }

  blobReader.read();

  clickHandler();

  linkResolver(blobReader);
}

injection(window, function (err) {
  if (err) {
    throw err;
  }

  console.time('total');
  main();
  console.timeEnd('total');
});
