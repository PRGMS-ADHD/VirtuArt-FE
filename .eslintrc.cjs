module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: [
    'jest',
    'prettier',
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
  ],
  'settings': {
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error'],
    'no-param-reassign': ['error', {props: false}],
    'import/no-extraneous-dependencies': ['error', {devDependencies: false}],
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
  },
};
