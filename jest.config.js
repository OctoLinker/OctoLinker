module.exports = {
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  setupFiles: ['<rootDir>/_jestsetup.js'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
  testURL: 'http://localhost/',
  coverageDirectory: './coverage/',
  testEnvironment: 'jsdom',
  collectCoverage: true,
};
