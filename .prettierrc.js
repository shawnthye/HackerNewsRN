module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',

  /**
   * @see https://github.com/trivago/prettier-plugin-sort-imports#apis
   */
  importOrder: [
    '^./src/polyfills$',
    '^react$',
    '^react-native$',
    '^react-native-gesture-handler$',
    '^@react-navigation/(.*)$',
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
  ],
};
