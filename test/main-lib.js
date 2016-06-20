import 'babel-polyfill';

const context = require.context('.', true, /.+\.test\.js?$/);
context.keys().forEach(context);

module.exports = context; // eslint-disable-line no-undef
