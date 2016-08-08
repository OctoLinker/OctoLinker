const presets = {

  'JavaScript': {
    pathSubstrings: [
      '.js',
      '.jsx',
      '.es6',
    ],
    githubClasses: [
      'type-javascript',
      'type-jsx',
    ],
  },

  'CoffeeScript': {
    pathSubstrings: ['.coffee'],
    githubClasses: [
      'type-coffeescript',
    ],
  },

  'TypeScript': {
    pathSubstrings: ['.ts'],
    githubClasses: [
      'type-typescript',
    ],
  },

  'Ruby': {
    pathSubstrings: ['.rb'],
    githubClasses: [
      'type-ruby',
    ],
  },

  'Docker': {
    pathSubstrings: ['Dockerfile'],
    githubClasses: ['type-dockerfile'],
  },

  'Vim': {
    pathSubstrings: [
      '.vimrc',
      '.gvimrc',
      '.vim',
      // Sometimes there's no leading dot in .vimrc and .gvimrc, for example:
      // https://github.com/gmarik/vimfiles/blob/1f4f26d42f54443f1158e0009746a56b9a28b053/vimrc#L136
      'vimrc',
      'gvimrc',
    ],
    githubClasses: ['type-viml'],
  },

  'Rust': {
    pathSubstrings: ['.rs'],
    githubClasses: ['type-rust'],
  },

  'Python': {
    pathSubstrings: ['.py'],
    githubClasses: ['type-python'],
  },
};

export default function (presetName) {
  return presets[presetName];
}
