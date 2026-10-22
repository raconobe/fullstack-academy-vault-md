// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-redeclare': 'error',       // ← catches your duplicate init()
      'no-undef': 'error',           // ← catches debug() not imported
      'no-unused-vars': 'warn',
    },
  },
];   

