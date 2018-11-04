module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-env'],
    },
  },
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    ['@babel/transform-react-jsx', { pragma: 'h' }],
  ],
};
