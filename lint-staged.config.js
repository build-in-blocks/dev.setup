export default {
  '*.{mjs,ts,js}': [
    // Formats script file types
    'eslint --fix',
    'prettier --write',
  ],
  '*.{html,css,scss}': [
    // Formats other file types
    'prettier --write',
  ],
};
