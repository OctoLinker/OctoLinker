import XRegExp from 'xregexp/lib/xregexp';
import build from 'xregexp/lib/addons/build';

build(XRegExp);

// This function makes it easy to build regular expressions that look more like formal grammars.
// See here for more info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals
// http://xregexp.com/api/#build
export default XRegExp.tag('xngm');
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
