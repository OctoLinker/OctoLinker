export const presets = {

  JavaScript: {
    pathPatterns: [
      '.js$',
      '.jsx$',
      '.es6$',
    ],
    githubClasses: [
      'type-javascript',
      'type-jsx',
      'highlight-source-js',
    ],
  },

  CoffeeScript: {
    pathPatterns: ['.coffee$'],
    githubClasses: [
      'type-coffeescript',
      'highlight-source-coffee',
    ],
  },

  TypeScript: {
    pathPatterns: ['.ts$'],
    githubClasses: [
      'type-typescript',
      'highlight-source-ts',
    ],
  },

  Ruby: {
    pathPatterns: ['.rb$'],
    githubClasses: [
      'type-ruby',
      'highlight-source-ruby',
    ],
  },

  Docker: {
    pathPatterns: ['/Dockerfile$'],
    githubClasses: [
      'type-dockerfile',
      'highlight-source-dockerfile',
    ],
  },

  Vim: {
    pathPatterns: [
      '.vimrc$',
      '.gvimrc$',
      '.vim$',
      // Sometimes there's no leading dot in .vimrc and .gvimrc, for example:
      // https://github.com/gmarik/vimfiles/blob/1f4f26d42f54443f1158e0009746a56b9a28b053/vimrc#L136
      '/vimrc$',
      '/gvimrc$',
    ],
    githubClasses: [
      'type-viml',
      'highlight-source-viml',
    ],
  },

  Rust: {
    pathPatterns: ['.rs$'],
    githubClasses: [
      'type-rust',
      'highlight-source-rust',
    ],
  },

  Python: {
    pathPatterns: ['.py$'],
    githubClasses: [
      'type-python',
      'highlight-source-python',
    ],
  },

  RequirementsTxt: {
    pathPatterns: ['requirements.txt$'],
    githubClasses: [],
  },

  Go: {
    pathPatterns: ['.go$'],
    githubClasses: [
      'type-go',
      'highlight-source-go',
    ],
  },

  Haskell: {
    pathPatterns: ['.hs$'],
    githubClasses: [
      'type-haskell',
    ],
  },

  css: {
    pathPatterns: ['.css$'],
    githubClasses: [
      'type-css',
      'highlight-source-css',
    ],
  },

  sass: {
    pathPatterns: ['.scss$', '.sass$'],
    githubClasses: [
      'type-sass',
      'highlight-source-sass',
    ],
  },

  less: {
    pathPatterns: ['.less$'],
    githubClasses: [
      'type-less',
      'highlight-source-css-less',
    ],
  },

  html: {
    pathPatterns: [
      '.html$',
      '.htm$',
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
    pathPatterns: presets[presetName].pathPatterns.concat(presets[siblingPresetName].pathPatterns),
    githubClasses: presets[presetName].githubClasses.concat(presets[siblingPresetName].githubClasses),
  };
}
