import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2], // Enforce 2-space indentation
      '@stylistic/js/linebreak-style': ['error', 'unix'], // Use Unix-style line breaks
      '@stylistic/js/quotes': ['error', 'single'], // Use single quotes for strings
      '@stylistic/js/semi': ['error', 'never'], // No semicolons at end of lines
      eqeqeq: 'error', // Force use of === instead of ==
      'no-trailing-spaces': 'error', // Remove unnecessary spaces at the end of lines
      'object-curly-spacing': ['error', 'always'], // Add spaces inside { objects }
      'arrow-spacing': ['error', { before: true, after: true }], // Add spaces around =>
      'no-console': 'off', // Allow console.log
    },
  },
  {
    ignores: ['dist/**'], // Ignore built files
  },
]
