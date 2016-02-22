import 'babel-polyfill';
import injection from 'github-injection';
import BlobReader from '../helper-blob-reader';
import linkResolver from '../link-resolver';
import clickHandler from '../helper-click-handler';

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
