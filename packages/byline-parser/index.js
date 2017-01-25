import assert from 'assert';

export default function (blobSource, { openingPattern, closingPattern, matchPattern }) {
  assert.ok(openingPattern, 'openingPattern is not defined');
  assert.ok(openingPattern instanceof RegExp, 'openingPattern is not a RegExp');
  assert.ok(closingPattern, 'closingPattern is not defined');
  assert.ok(closingPattern instanceof RegExp, 'closingPattern is not a RegExp');
  assert.ok(matchPattern, 'matchPattern is not defined');
  assert.ok(matchPattern instanceof RegExp, 'matchPattern is not a RegExp');

  let tmp = [];
  let results = [];
  let reading = false;

  const NO_CAPTURE_GROUP = 1;

  blobSource.split('\n').forEach((line) => {
    if (!reading) {
      reading = !!line.match(openingPattern);
      return;
    }

    reading = !line.match(closingPattern);

    if (!reading) {
      results = results.concat(tmp);
      tmp = [];
      return;
    }

    const captureGroup = line.match(matchPattern);
    if (captureGroup) {
      if (captureGroup.length === NO_CAPTURE_GROUP) {
        throw new Error('No capture group is defined');
      }

      tmp.push(captureGroup.slice(1));
    }
  });

  return results;
}
