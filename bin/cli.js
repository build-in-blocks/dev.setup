#!/usr/bin/env node

/*global console*/

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import process from 'process';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Path Resolution ---
const userAppRoot = process.cwd();
const engineRoot = path.resolve(__dirname, '..');
const internalModulesPath = path.resolve(engineRoot, 'node_modules');
const internalBinPath = path.resolve(internalModulesPath, '.bin');

// Safely find binary paths for the internal tools
const getBinPath = (pkgName, binSubPath) => {
  try {
    const pkgRoot = path.dirname(require.resolve(`${pkgName}/package.json`));
    return path.join(pkgRoot, binSubPath);
  } catch {
    return path.resolve(internalBinPath, pkgName);
  }
};

const huskyBin = getBinPath('husky', 'bin.js');
const lintStagedBin = getBinPath('lint-staged', 'bin/lint-staged.js');

const command = process.argv[2];

// ---------------------------------------------------------
// COMMAND: setup-git
// ---------------------------------------------------------
if (command === 'setup-git') {
  console.log('🐶 Setting up @build-in-blocks git hooks...');
  try {
    execSync(`node "${huskyBin}"`, { stdio: 'inherit' });
    const preCommitPath = path.join(userAppRoot, '.husky/pre-commit');

    // Use 'npx blocks' to ensure portability in the User App
    const hookContent = 'npx blocks internal-lint';

    fs.writeFileSync(preCommitPath, hookContent, { mode: 0o755 });

    console.log('✅ Git hooks integrated successfully.');
  } catch {
    console.error('❌ Git hook setup failed.');
  }
}

// ---------------------------------------------------------
// COMMAND: internal-lint
// ---------------------------------------------------------
if (command === 'internal-lint') {
  const configPath = path.resolve(engineRoot, 'configs/lint-staged.config.mjs');
  try {
    // Detect the correct PATH key (Windows compatibility)
    const pathKey =
      process.platform === 'win32'
        ? Object.keys(process.env).find((k) => k.toUpperCase() === 'PATH') ||
          'PATH'
        : 'PATH';

    const env = {
      ...process.env,
      [pathKey]: `${internalBinPath}${path.delimiter}${process.env[pathKey]}`,
      NODE_PATH: internalModulesPath,
      NODE_OPTIONS: '--no-warnings',
    };

    execSync(`node "${lintStagedBin}" --config "${configPath}"`, {
      stdio: 'inherit',
      cwd: userAppRoot,
      env,
    });
  } catch {
    process.exit(1);
  }
}

// if (command === 'internal-lint') {
//     const lintStagedConfig = path.resolve(engineRoot, 'configs/lint-staged.config.mjs');

//     try {
//         const env = {
//             ...process.env,
//             PATH: `${internalBinPath}${path.delimiter}${process.env.PATH}`,
//             // We tell Node to look in the engine's node_modules
//             // when the User App's config tries to resolve its imports.
//             NODE_PATH: internalModulesPath,
//         };

//         execSync(`node ${lintStagedBin} --config ${lintStagedConfig}`, {
//             stdio: 'inherit',
//             env
//         });
//     } catch (e) {
//         process.exit(1);
//     }
// }
