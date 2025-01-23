module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'prettier', // Ensures Prettier rules are respected
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // React 17+ does not require importing React in scope
    'react/prop-types': 'off', // Disable prop-types (use TypeScript for type checking if needed)
    'import/prefer-default-export': 'off', // Allow named exports
    'jsx-a11y/no-static-element-interactions': 'off', // Customize as needed
    'max-len': ['error', { code: 130, tabWidth: 2, ignoreUrls: true }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function', // Allow arrow functions for named components
        unnamedComponents: 'arrow-function', // Allow arrow functions for unnamed components
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
