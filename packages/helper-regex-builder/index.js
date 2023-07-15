import escapeRegexString from 'escape-regex-string';

function regexBuilder(key, value, groupKey, global) {
  const regexKey = escapeRegexString(key);
  const keyField = groupKey ? `("${regexKey}")` : `"${regexKey}"`;
  if (Object.prototype.toString.call(value) !== '[object String]') {
    return new RegExp(`${keyField}`, global ? 'g' : undefined);
  }

  const regexValue = escapeRegexString(value);
  const valueField = `"(${regexValue})"`;
  return new RegExp(
    `${keyField}\\s*:\\s*${valueField}`,
    global ? 'g' : undefined,
  );
}

export function jsonRegExKeyValue(key, value, global = true) {
  return regexBuilder(key, value, true, global);
}

export function jsonRegExValue(key, value, global = true) {
  return regexBuilder(key, value, false, global);
}

export function jsonRegExArrayValue(value) {
  return new RegExp(`("${value}")`, 'g');
}

export function tomlRegExKeyValue(key, value) {
  const regexKey = escapeRegexString(key);
  const regexValue = escapeRegexString(value);

  return new RegExp(`(${regexKey})\\s*=\\s*"(${regexValue})"`, 'g');
}
