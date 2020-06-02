const path = jest.requireActual('path');

path.join = path.posix.join;

module.exports = path;
