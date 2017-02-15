import XRegExp from 'xregexp';

export default function (subpatterns) {
  return (pattern) => {
    const buildPattern = `(?x)${String.raw(pattern)}`;
    const flags = 'ngm';
    return XRegExp.build(buildPattern, subpatterns, flags);
  };
}
