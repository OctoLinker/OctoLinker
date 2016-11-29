
const webpackConfig = require('./webpack.config');

webpackConfig.devtool = 'inline-source-map';

if (process.env.APPVEYOR) {
  require('phantomjs-prebuilt').path = ''; // eslint-disable-line
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'fixture', 'phantomjs-shim'],
    files: [
      'test/main-lib.js',
      'test/main-packages.js',
      'packages/*/fixtures/**/*.html',
    ],
    exclude: [],
    preprocessors: {
      'test/main-lib.js': ['webpack', 'sourcemap'],
      'test/main-packages.js': ['webpack', 'sourcemap'],
      'packages/*/fixtures/**/*.html': ['html2js'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    reporters: ['mocha'],
    browsers: ['PhantomJS'],
    singleRun: true,
  });
};
