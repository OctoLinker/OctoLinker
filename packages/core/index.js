import injection from 'github-injection';
import blobReader from '../helper-blob-reader';
import liveResolver from '../live-resolver';
import manifestNpm from '../manifest-npm';

function main() {
  console.time('total');

  const blobs = blobReader();

  console.log('Total blobs: ', blobs.length);
  blobs.forEach((blob) => {
    console.log(blob.type, blob.path);
  });

  liveResolver(blobs, {
    debug: true,
  });
  manifestNpm(blobs, {
    debug: true,
  });

  console.timeEnd('total');
}

injection(window, function(err) {
  if (err) {
    throw err;
  }

  main();
});
