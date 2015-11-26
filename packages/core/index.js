import injection from 'github-injection';
import blobReader from '../helper-blob-reader';
import liveResolver from '../live-resolver';

function main() {
  console.time('total');

  const blobs = blobReader();

  liveResolver(blobs, {
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
