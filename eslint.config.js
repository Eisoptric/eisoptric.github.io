import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'dist-ssr', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    files: ['src/**/*.{ts,vue}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['scripts/**/*.mjs', '*.config.{js,ts}'],
    languageOptions: { globals: globals.node },
  },
  {
    // og.mjs runs one function inside the headless browser, where `document` exists.
    files: ['scripts/og.mjs'],
    languageOptions: { globals: { document: 'readonly' } },
  },
  {
    rules: {
      // Pages and components are named by their file (HomePage.vue, Footer.vue): single words are fine here.
      'vue/multi-word-component-names': 'off',
    },
  },
  prettier,
)
