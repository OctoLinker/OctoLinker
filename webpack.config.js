const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line

module.exports = {
  entry: {
    app: './lib/app',
    background: './lib/background',
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
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          plugins: ['transform-object-rest-spread'],
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
