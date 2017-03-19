export const presets = {

  JavaScript: {
    pathSubstrings: [
      '.js',
      '.jsx',
      '.es6',
    ],
    githubClasses: [
      'type-javascript',
      'type-jsx',
      'highlight-source-js',
    ],
  },

  CoffeeScript: {
    pathSubstrings: ['.coffee'],
    githubClasses: [
      'type-coffeescript',
      'highlight-source-coffee',
    ],
  },

  TypeScript: {
    pathSubstrings: ['.ts'],
    githubClasses: [
      'type-typescript',
      'highlight-source-ts',
    ],
  },

  Ruby: {
    pathSubstrings: ['.rb'],
    githubClasses: [
      'type-ruby',
      'highlight-source-ruby',
    ],
  },

  Docker: {
    pathSubstrings: ['Dockerfile'],
    githubClasses: [
      'type-dockerfile',
      'highlight-source-dockerfile',
    ],
  },

  Vim: {
    pathSubstrings: [
      '.vimrc',
      '.gvimrc',
      '.vim',
      // Sometimes there's no leading dot in .vimrc and .gvimrc, for example:
      // https://github.com/gmarik/vimfiles/blob/1f4f26d42f54443f1158e0009746a56b9a28b053/vimrc#L136
      'vimrc',
      'gvimrc',
    ],
    githubClasses: [
      'type-viml',
      'highlight-source-viml',
    ],
  },

  Rust: {
    pathSubstrings: ['.rs'],
    githubClasses: [
      'type-rust',
      'highlight-source-rust',
    ],
  },

  Python: {
    pathSubstrings: ['.py'],
    githubClasses: [
      'type-python',
      'highlight-source-python',
    ],
  },

  Go: {
    pathSubstrings: ['.go'],
    githubClasses: [
      'type-go',
      'highlight-source-go',
    ],
  },

  Haskell: {
    pathSubstrings: ['.hs'],
    githubClasses: [
      'type-haskell',
    ],
  },

  css: {
    pathSubstrings: ['.css'],
    githubClasses: [
      'type-css',
      'highlight-source-css',
    ],
  },

  sass: {
    pathSubstrings: ['.scss', '.sass'],
    githubClasses: [
      'type-sass',
      'highlight-source-sass',
    ],
  },

  html: {
    pathSubstrings: [
      '.html',
      '.htm',
    ],
    githubClasses: [
      'type-html',
    ],
  },
};

export default function (presetName, siblingPresetName) {
  if (!siblingPresetName) {
    return presets[presetName];
  }

  return {
    pathSubstrings: presets[presetName].pathSubstrings.concat(presets[siblingPresetName].pathSubstrings),
    githubClasses: presets[presetName].githubClasses.concat(presets[siblingPresetName].githubClasses),
  };
}
