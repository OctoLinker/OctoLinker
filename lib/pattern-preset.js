const presets = {

  'JavaScript': [
    '.js',
    '.jsx',
    '.es6',
  ],

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
