/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    '@vue/typescript/recommended',
    '@vue/prettier',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-async-promise-executor': 0,
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-this-alias': ['off'],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
