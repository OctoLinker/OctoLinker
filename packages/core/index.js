import injection from 'github-injection';
import sourceReader from '../source-reader';
import liveResolver from '../live-resolver';
import {requireRegex} from '../live-resolver/grammar/javascript';

function main() {
  console.time('total');

  const blobs = sourceReader();

  liveResolver(blobs, {
    debug: true,
    regex: requireRegex,
  });

  console.timeEnd('total');
}

injection(window, function(err) {
  if (err) {
    throw err;
  }

  main();
});
