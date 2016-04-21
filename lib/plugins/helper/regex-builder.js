import escapeRegexString from 'escape-regex-string';

function regexBuilder(key, value, groupKey) {
  const regexKey = escapeRegexString(key);
  const regexValue = escapeRegexString(value);
  const valueField = `("${regexValue}")`;
  const keyField = groupKey ? `("${regexKey}")` : `"${regexKey}"`;

  return new RegExp(`${keyField}\\s*:\\s*${valueField}`);
}

export function jsonRegExKeyValue(key, value) {
  return regexBuilder(key, value, true);
}

export function jsonRegExValue(key, value) {
  return regexBuilder(key, value, false);
}
