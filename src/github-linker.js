import sourceReader from './sourceReader';

console.time('sourceReader');

const res = sourceReader();

console.timeEnd('sourceReader');

console.dir(res);
