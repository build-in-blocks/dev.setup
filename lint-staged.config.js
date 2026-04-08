export default {
  '*.{mjs,ts,js}': [
    // Formats script file types
    'blocks-lint --fix',
    'blocks-format --write',
  ],
  '*.{html,css,scss}': [
    // Formats other file types
    'blocks-format --write',
  ],
};
