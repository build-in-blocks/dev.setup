// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

// 1. Re-export the helper so the user app can use it
export { defineConfig };

// 2. Create the base configuration
const baseConfig = defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  {
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      camelcase: 'error',
    },
  },
  eslintConfigPrettier,
);

// 3. Export the array directly
export default baseConfig;
