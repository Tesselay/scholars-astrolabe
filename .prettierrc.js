export default {
  singleQuote: true,
  semi: false,
  trailingComma: 'es5',
  printWidth: 100,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
    {
      files: ['*.md', '*.mdx'],
      options: { proseWrap: 'always' },
    },
  ],
};
