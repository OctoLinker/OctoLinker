module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify', 'fixture', 'phantomjs-shim'],
    files: [
      'packages/**/*.js',
      'packages/*/test/*.test.js',
      'packages/*/test/fixtures/**/*.html',
    ],
    exclude: [],
    preprocessors: {
      'packages/**/*.js': ['browserify'],
      'packages/*/test/*.test.js': ['browserify'],
      'packages/*/test/fixtures/**/*.html': ['html2js'],
    },
    browserify: {
      debug: true,
      transform: [
        ['babelify'],
      ],
    },
    babelPreprocessor: {},
    reporters: ['mocha'],
    browsers: ['PhantomJS'],
    singleRun: true,
  });
};
