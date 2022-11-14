export default {
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  setupFiles: ['<rootDir>/_jestsetup.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  coverageDirectory: './coverage/',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['jsdom'],
    url: 'http://localhost/',
  },
  collectCoverage: true,
};
