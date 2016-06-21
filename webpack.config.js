const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './lib/app',
    background: './lib/background',
  },
  devtool: 'source-map',
  output: {
    path: 'dist',
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets' },
    ]),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
