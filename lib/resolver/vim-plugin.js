// Logic adapted from https://github.com/VundleVim/Vundle.vim/blob/11fdc428fe741f4f6974624ad76ab7c2b503b73e/doc/vundle.txt#L196
export default function ({ shorthand }) {
  const components = shorthand.split('/');

  // GitHub is used when a user/repo is passed to `Plugin`.
  if (components.length === 2) {
    return ['https://github.com/' + shorthand];
  }
  // Any single word without a slash '/' is assumed to be from Vim Scripts.
  if (components.length === 1) {
    return ['https://github.com/vim-scripts/' + shorthand];
  }
  // Assume it's a URL otherwise. We can't link to git/ssh, so change to https
  // and hope it works.
  return [
    shorthand.replace(/^git|ssh/, 'https'),
    shorthand.replace(/^git|ssh/, 'http'),
  ];
}
