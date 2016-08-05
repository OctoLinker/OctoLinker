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

  'TypeScript': [
    '.ts',
  ],

  'Ruby': [
    '.rb',
  ],
};

export default function (presetName) {
  return presets[presetName];
}
