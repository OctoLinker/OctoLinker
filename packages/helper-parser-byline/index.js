import assert from 'assert';

export default function (
  blobSource,
  { openingPattern, closingPattern, matchPattern },
) {
  assert.ok(matchPattern, 'matchPattern is not defined');
  assert.ok(matchPattern instanceof RegExp, 'matchPattern is not a RegExp');
  if (openingPattern)
    assert.ok(
      openingPattern instanceof RegExp,
      'openingPattern is not a RegExp',
    );
  if (closingPattern)
    assert.ok(
      closingPattern instanceof RegExp,
      'closingPattern is not a RegExp',
    );

  const noGroup = !(openingPattern && closingPattern);

  let tmp = [];
  let results = [];
  let reading = noGroup;

  const NO_CAPTURE_GROUP = 1;

  blobSource.split('\n').forEach((line) => {
    if (!noGroup && !reading) {
      reading = !!line.match(openingPattern);
      return;
    }

    reading = noGroup || !line.match(closingPattern);

    if (!noGroup && !reading) {
      results = results.concat(tmp);
      tmp = [];
      return;
    }

    const captureGroup = line.match(matchPattern);
    if (captureGroup) {
      if (captureGroup.length === NO_CAPTURE_GROUP) {
        throw new Error('No capture group is defined');
      }

      (noGroup ? results : tmp).push(captureGroup.slice(1));
    }
  });

  return results;
}
