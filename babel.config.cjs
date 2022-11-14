module.exports = (api) => {
  const isTest = api.env('test');

  const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    ['@babel/transform-react-jsx', { pragma: 'h' }],
  ];

  if (isTest) {
    plugins.push('@babel/plugin-transform-runtime');
  }

  return {
    env: {
      test: {
        presets: ['@babel/preset-env'],
      },
    },
    plugins,
  };
};
