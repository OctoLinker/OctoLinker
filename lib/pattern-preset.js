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
};

export default function (presetName) {
  return presets[presetName];
}
