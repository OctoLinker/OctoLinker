import injection from 'github-injection';
import blobReader from '../helper-blob-reader';
import liveResolver from '../live-resolver';
import {requireRegex, importRegex} from '../live-resolver/grammar/javascript';

function main() {
  console.time('total');

  const blobs = sourceReader();

  liveResolver(blobs, {
    debug: true,
    regex: [
      requireRegex,
      importRegex,
    ],
  });

  console.timeEnd('total');
}

injection(window, function(err) {
  if (err) {
    throw err;
  }

  main();
});
