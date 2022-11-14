module.exports = {
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  setupFiles: ['<rootDir>/_jestsetup.js'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
  coverageDirectory: './coverage/',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  collectCoverage: true,
};
