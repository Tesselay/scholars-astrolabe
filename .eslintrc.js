module.exports = {
  root: true,

  // Default parser & rules for .ts/.tsx
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier', // keep last in the top-level chain
  ],

  overrides: [
    // Astro
    {
      files: ['**/*.astro'],
      // Use Astro parser, and delegate inside to TS parser for script parts
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      extends: [
        'plugin:astro/recommended',
        // Enables jsx-a11y rules for Astro templates
        'plugin:astro/jsx-a11y',
      ],
      rules: {
        // Add Astro-specific tweaks here if needed
      },
    },
  ],

  env: {
    es2022: true,
    browser: true,
    node: true,
  },

  ignorePatterns: [
    'dist/',
    '.astro/',
    'node_modules/',
  ],
};
