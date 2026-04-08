
import { createRequire } from 'module';
import blocksDevSetupBaseConfig from '../eslint.config.mjs';

const require = createRequire(import.meta.url);

// Dynamic Discovery: Find ESLint wherever the package manager put it
const eslintConfigPath = require.resolve('eslint/config');
const { defineConfig } = require(eslintConfigPath);

export { defineConfig, blocksDevSetupBaseConfig };



// dev.setup/configs/eslint.helper.mjs
// import { defineConfig } from 'eslint/config';
// import blocksDevSetupBaseConfig from '../eslint.config.mjs';

// export { defineConfig, blocksDevSetupBaseConfig };