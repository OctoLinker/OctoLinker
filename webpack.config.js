const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line

module.exports = (env, argv) => ({
  mode: 'development',
  entry: {
    app: './packages/core/app',
    background: './packages/core/background/index',
    options: './packages/helper-settings/page',
  },
  devtool: argv.mode === 'development' ? 'source-map' : '',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'assets' }]),
    new webpack.EnvironmentPlugin(['OCTOLINKER_LIVE_DEMO']),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
});
