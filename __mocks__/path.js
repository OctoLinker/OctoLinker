const path = require.requireActual('path');

path.join = path.posix.join;

module.exports = path;
