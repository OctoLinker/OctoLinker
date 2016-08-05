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

  'CoffeeScript': [
    '.coffee',
  ],

  'TypeScript': {
    pathSubstrings: ['.ts'],
    githubClasses: [
      'type-typescript',
    ],
  },

  'Ruby': [
    '.rb',
  ],
};

export default function (presetName) {
  return presets[presetName];
}
