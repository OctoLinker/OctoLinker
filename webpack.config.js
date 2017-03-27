const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line

module.exports = {
  entry: {
    app: './lib/app',
    background: './lib/background/index',
    options: './lib/options/page',
  },
  devtool: 'source-map',
  output: {
    path: 'dist',
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets' },
    ], {
      ignore: ['manifest.json'],
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/primer-core/build/', to: 'core.css' },
      { from: 'node_modules/primer-forms/build/', to: 'form.css' },
    ]),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
};
