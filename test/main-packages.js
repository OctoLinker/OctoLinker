const context = require.context('../packages', true, /\.?test\.js?$/);
context.keys().forEach(context);

module.exports = context; // eslint-disable-line no-undef
