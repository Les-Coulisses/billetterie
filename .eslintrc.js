module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'jsx-quotes': ['error', 'prefer-single'],
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'operator-linebreak': ['error', 'after'],
    'linebreak-style': 0
  }
};
