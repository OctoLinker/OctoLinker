const presets = {

  'JavaScript': {
    pathSubstrings: [
      '.js',
      '.jsx',
      '.es6',
    ],
    githubClasses: ['type-javascript'],
  },

  'CoffeeScript': [
    '.coffee',
  ],

  'TypeScript': [
    '.ts',
  ],

  'Ruby': {
    pathSubstrings: [
      '.rb',
    ],
  },
};

export default function (presetName) {
  return presets[presetName];
}
