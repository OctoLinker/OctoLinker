import 'babel-polyfill';
import injection from 'github-injection';
import blobReader from '../helper-blob-reader';
import linkResolver from '../link-resolver';
import manifestNpm from '../manifest-npm';
import clickHandler from '../helper-click-handler';

function main() {
  console.time('total');

  const blobs = blobReader();

  if (blobs.length === 0) {
    return;
  }

  document.body.classList.add('octo-linker-debug');

  clickHandler();

  console.log('Total blobs: ', blobs.length);
  blobs.forEach((blob) => {
    console.log(blob.type, blob.path);
  });

  linkResolver(blobs);
  manifestNpm(blobs);

  console.timeEnd('total');
}

injection(window, function (err) {
  if (err) {
    throw err;
  }

  main();
});
