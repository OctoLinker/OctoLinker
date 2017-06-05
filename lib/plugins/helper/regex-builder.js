import escapeRegexString from 'escape-regex-string';

function regexBuilder(key, value, groupKey) {
  const regexKey = escapeRegexString(key);
  const keyField = groupKey ? `("${regexKey}")` : `"${regexKey}"`;
  if (Object.prototype.toString.call(value) !== '[object String]') {
    return new RegExp(`${keyField}`);
  }

  const regexValue = escapeRegexString(value);
  const valueField = `("${regexValue}")`;
  return new RegExp(`${keyField}\\s*:\\s*${valueField}`);
}

export function jsonRegExKeyValue(key, value) {
  return regexBuilder(key, value, true);
}

export function jsonRegExValue(key, value) {
  return regexBuilder(key, value, false);
}
