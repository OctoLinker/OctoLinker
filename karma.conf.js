module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify', 'fixture'],
    files: [
      'src/**/*.js',
      'test/**/*.spec.js',
      'test/fixtures/*.html',
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.spec.js': ['browserify'],
      'test/fixtures/*.html': ['html2js'],
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
