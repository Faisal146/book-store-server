import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'no-console': 'warn',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  {
    globals: {
      process: 'readonly',
    },
  },
  {
    ignores: ['.node_modules/*'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

module.exports = [
  // Any other config imports go at the top
  eslintPluginPrettierRecommended,
];
