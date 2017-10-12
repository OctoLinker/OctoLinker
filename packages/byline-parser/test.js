import assert from 'assert';
import bylineParser from './index.js';

const fixture = `val0
start
val1
val2
end
start
val3
end
val4`;

const expected = [['val1'], ['val2'], ['val3']];

const fixtureCorrupt = `start
val1
end
start
val2`;

const expectedCorrupt = [['val1']];

const expectedAllValues = [['val0'], ['val1'], ['val2'], ['val3'], ['val4']];

const openingPattern = /^start$/;
const closingPattern = /^end$/;
const matchPattern = /(\w+)/;

describe('byline-parser', () => {
  describe('setup', () => {
    it('throws an error if openingPattern is not a RegExp', () => {
      assert.throws(() => {
        bylineParser(fixture, {
          matchPattern,
          openingPattern: 'abc',
        });
      }, /openingPattern is not a RegExp/);
    });

    it('throws an error if closingPattern is not a RegExp', () => {
      assert.throws(() => {
        bylineParser(fixture, {
          matchPattern,
          closingPattern: 'abc',
        });
      }, /closingPattern is not a RegExp/);
    });

    it('throws an error if matchPattern is not specified', () => {
      assert.throws(() => {
        bylineParser(fixture, {
          openingPattern,
          closingPattern,
        });
      }, /matchPattern is not defined/);
    });

    it('throws an error if matchPattern is not a RegExp', () => {
      assert.throws(() => {
        bylineParser(fixture, {
          openingPattern,
          closingPattern,
          matchPattern: 'abc',
        });
      }, /matchPattern is not a RegExp/);
    });

    it('throws an error if no capture group is defined', () => {
      assert.throws(() => {
        bylineParser(fixture, {
          openingPattern,
          closingPattern,
          matchPattern: /\w+/,
        });
      }, /No capture group is defined/);
    });
  });

  it('does not collect values if closing pattern is missing', () => {
    assert.deepEqual(
      [],
      bylineParser(fixture, {
        openingPattern,
        closingPattern: /^notdefined$/,
        matchPattern,
      }),
    );
  });

  it('does not collect values if closing line is missing', () => {
    assert.deepEqual(
      expectedCorrupt,
      bylineParser(fixtureCorrupt, {
        openingPattern,
        closingPattern,
        matchPattern,
      }),
    );
  });

  it('collects values between opening and close pattern', () => {
    assert.deepEqual(
      expected,
      bylineParser(fixture, {
        openingPattern,
        closingPattern,
        matchPattern,
      }),
    );
  });

  it('collects match values', () => {
    assert.deepEqual(
      expectedAllValues,
      bylineParser(fixture, {
        matchPattern: /(val[0-9])/,
      }),
    );
  });
});
