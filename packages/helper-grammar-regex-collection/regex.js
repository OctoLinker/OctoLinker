import zip from 'pop-zip/zip';
import XRegExp from 'xregexp/src/xregexp';
import build from 'xregexp/src/addons/build';

build(XRegExp);

function interpolate(substitution) {
  return substitution instanceof RegExp
    ? substitution
    : XRegExp.escape(substitution);
}

// This function makes it easy to build regular expressions that look more like formal grammars.
// See here for more info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals
// http://xregexp.com/api/#build
export default function (literals, ...substitutions) {
  const flags = 'xngm';
  let buildPattern = '';
  const subpatterns = [];

  // make `substitutions` the same length as `literals`
  // so we can iterate over them together
  const pairs = zip(literals.raw, substitutions.concat(''));
  pairs.forEach(([literal, substitution], index) => {
    subpatterns[index] = interpolate(substitution);
    buildPattern += `${literal}{{${index}}}`;
  });

  return XRegExp.build(buildPattern, subpatterns, flags);
}
/* Usage Example:

    import regex from './regex';
    const sub = /inner/;
    const outer = regex`
      # comments start with #
      before

      # whitespace is insignificant, match it with \s
      \s

      # a reference to the 'sub' regex
      ${sub}

      \s

      # groups are not captured by default
      (after | after2)

      \s

      # this group is captured
      (?<name> after2 )
      $
    `;
    outer.exec('before inner after after2'); // ['before inner after after2', 'after2']
*/
