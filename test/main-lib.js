import 'babel-polyfill';

window.chrome = {
  runtime: {
    sendMessage: () => {},
    onMessage: {
      addListener: () => {},
    },
  },
};

const context = require.context('.', true, /.+\.test\.js?$/);
context.keys().forEach(context);

module.exports = context; // eslint-disable-line no-undef
