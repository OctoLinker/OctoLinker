import { jsonRegExValue, jsonRegExKeyValue } from '../index';

describe('helper-regex-builder', () => {
  it('jsonRegExValue', () => {
    expect(jsonRegExValue('foo', 'bar')).toEqual(/"foo"\s*:\s*("bar")/g);
    expect(jsonRegExValue('foo', 'bar', false)).toEqual(/"foo"\s*:\s*("bar")/g);
    expect(jsonRegExValue('foo', 'bar', true)).toEqual(/"foo"\s*:\s*("bar")/g);
  });

  it('jsonRegExKeyValue', () => {
    expect(jsonRegExKeyValue('foo', 'bar')).toEqual(/("foo")\s*:\s*("bar")/g);
    expect(jsonRegExKeyValue('foo', 'bar', false)).toEqual(
      /("foo")\s*:\s*("bar")/g,
    );
    expect(jsonRegExKeyValue('foo', 'bar', true)).toEqual(
      /("foo")\s*:\s*("bar")/g,
    );
  });
});
