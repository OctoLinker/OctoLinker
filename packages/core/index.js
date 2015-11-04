import injection from 'github-injection';
import liveResolver from '../live-resolver';

function main() {
  console.time('total');

  liveResolver();

  console.timeEnd('total');
}

injection(window, function(err) {
  if (err) {
    throw err;
  }

  main();
});
