import XRegExp from 'xregexp/src/xregexp';
import build from 'xregexp/src/addons/build';

build(XRegExp);

export default function (subpatterns) {
  return (pattern) => {
    const buildPattern = `(?x)${String.raw(pattern)}`;
    const flags = 'ngm';
    return XRegExp.build(buildPattern, subpatterns, flags);
  };
}
