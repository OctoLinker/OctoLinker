const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line
const ExtensionReloader = require('webpack-extension-reloader');

module.exports = (env, argv) => ({
  mode: 'development',
  entry: {
    app: './packages/core/app',
    background: './packages/core/background/index',
    options: './packages/helper-settings/page',
  },
  devtool: argv.mode === 'development' ? 'source-map' : false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      url: require.resolve('url'),
      vm: require.resolve('vm-browserify'),
    },
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: 'assets' }] }),
    new webpack.EnvironmentPlugin({
      OCTOLINKER_LIVE_DEMO: null,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    argv.mode === 'development'
      ? new ExtensionReloader({
          port: 9090,
          reloadPage: true,
          entries: {
            contentScript: ['app'],
            background: 'background',
          },
        })
      : false,
  ].filter(Boolean),
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
