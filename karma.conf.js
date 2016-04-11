module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify', 'fixture', 'phantomjs-shim'],
    files: [
      'lib/**/*.js',
      'packages/**/*.js',
      'packages/*/fixtures/**/*.html',
    ],
    exclude: [],
    preprocessors: {
      'lib/**/*.js': ['browserify'],
      'packages/**/*.js': ['browserify'],
      'packages/*/fixtures/**/*.html': ['html2js'],
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
