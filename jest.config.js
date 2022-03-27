const ignorePatterns = ['<rootDir>/.jest/', '<rootDir>/src/core-images'];
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      '<rootDir>/.jest/.assets-transformer.js',
  },
  setupFiles: ['<rootDir>/.jest/react-navigation.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)',
  ],
  testPathIgnorePatterns: ignorePatterns,
  coveragePathIgnorePatterns: ignorePatterns,
  coverageReporters: [
    // 'clover',
    //'json',
    //'lcov',
    ['text', {skipFull: false}],
    'html',
  ],
};
