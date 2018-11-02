module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-env'],
    },
  },
  plugins: [
    'transform-object-rest-spread',
    ['@babel/transform-react-jsx', { pragma: 'h' }],
  ],
};
