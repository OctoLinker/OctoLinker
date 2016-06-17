const argv = require('yargs').argv;
const webpackConfig = require('./webpack.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dist = argv.dist;

const config = Object.assign({}, webpackConfig, {
  devtool: '',
  output: {
    path: `dist/${dist}`,
    filename: '[name].js',
  },
});

config.plugins.push(
  new CopyWebpackPlugin([
    { from: `${dist}/manifest.json` },
  ])
);

module.exports = config;
