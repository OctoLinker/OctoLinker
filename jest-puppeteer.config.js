const path = require('path');

const extPath = path.join(__dirname, './dist');

module.exports = {
  launch: {
    dumpio: true,
    headless: false,
    args: [
      `--disable-extensions-except=${extPath}`,
      `--load-extension=${extPath}`,
    ],
  },
};
