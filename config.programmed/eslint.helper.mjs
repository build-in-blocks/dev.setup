
import { createRequire } from 'module';
import blocksDevSetupBaseConfig from '../eslint.config.mjs';

const require = createRequire(import.meta.url);

//-------------------------------------------------------------------
// Dynamic Discovery: Find ESLint wherever the package manager put it
//-------------------------------------------------------------------
const eslintConfigPath = require.resolve('eslint/config');
const { defineConfig } = require(eslintConfigPath);

export { defineConfig, blocksDevSetupBaseConfig };
//