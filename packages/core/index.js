import injection from 'github-injection';
import blobReader from '@octo-linker/helper-blob-reader';
import liveResolver from '@octo-linker/live-resolver';
import manifestNpm from '@octo-linker/manifest-npm';

function main() {
  console.time('total');

  const blobs = blobReader();

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
