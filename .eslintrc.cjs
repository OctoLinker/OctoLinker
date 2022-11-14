module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'react'],
  env: {
    jest: true,
    browser: true,
  },
  settings: {
    react: {
      pragma: 'h',
    },
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'func-names': 0,
    'id-length': [1, { exceptions: ['$'] }],
    'new-cap': [2, { capIsNewExceptions: ['Deferred'] }],
    'max-len': 0,
    'no-prototype-builtins': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'no-useless-escape': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'consistent-return': 0,
    'array-callback-return': 0,
    'jsx-a11y/label-has-for': 0,
  },
  globals: {
    fixture: true,
    chrome: true,
  },
};
