/*global console*/
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import process from 'process';

const require = createRequire(import.meta.url);

export const huskyLintStagePrep = ({ nodeModulePrefix }) => {
  try {
    console.log('☞ Preparing husky + lint-staged pre-commit environment...');

    // 1. Find the husky binary to run the initial 'init'
    // We resolve the main entry and look in the .bin sibling
    const huskyMain = require.resolve('husky');
    const huskyBin = path.resolve(path.dirname(huskyMain), '../.bin/husky');

    // 2. Initialize Husky
    // This creates the .husky/ directory structure
    execSync(`node "${huskyBin}" init`, { stdio: 'inherit' });

    // 3. THE UNIVERSAL CROSS-PLATFORM HOOK
    // - We use 'npx' because it is the standard way to find hoisted binaries.
    // - We use '--no-install' to ensure it NEVER tries to download anything.
    // - We wrap the command in a way that works for CMD, PowerShell, and Bash.
    const hookCommand = `npx --no-install lint-staged --config ${nodeModulePrefix}lint-staged.config.js`;

    // 4. Force overwrite the pre-commit hook file
    const hookPath = path.join(process.cwd(), '.husky/pre-commit');
    fs.writeFileSync(hookPath, hookCommand);

    // Fix permissions for Mac/Linux
    if (process.platform !== 'win32') {
      fs.chmodSync(hookPath, 0o755);
    }

    console.log('✔ Husky + lint-staged setup completed for production!');
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
};

// /*global console*/
// import { execSync } from 'child_process';
// import fs from 'fs';
// import path from 'path';
// import { createRequire } from 'module';
// import process from 'process';

// const require = createRequire(import.meta.url);

// export const huskyLintStagePrep = ({ nodeModulePrefix }) => {
//   try {
//     console.log('☞ Preparing husky + lint-staged pre-commit environment...');

//     // 1. Find Husky's main entry point (this is allowed by "exports")
//     const huskyMain = require.resolve('husky');

//     // 2. Go to the .bin folder.
//     // In a production install, husky is at /node_modules/husky
//     // The bin is at /node_modules/.bin/husky
//     const binFolder = path.resolve(path.dirname(huskyMain), '../.bin');

//     // We target the 'husky' binary. On Windows, it's 'husky.cmd',
//     // but Node's execSync/spawn handles the extension-less call well.
//     const huskyBin = path.join(binFolder, 'husky');

//     // 3. Initialize Husky for the first time
//     execSync(`node "${huskyBin}" init`, { stdio: 'inherit' });

//     // 4. THE SECURE, PORTABLE HOOK
//     // Using 'npx --no-install' is the gold standard here.
//     // - It works on Windows, Mac, and Linux.
//     // - It uses the hoisted lint-staged in the root node_modules.
//     // - It contains NO absolute paths to your computer.
//     const hookCommand = `npx --no-install lint-staged --config ${nodeModulePrefix}lint-staged.config.js`;

//     if (!fs.existsSync('.husky')) {
//       fs.mkdirSync('.husky', { recursive: true });
//     }

//     fs.writeFileSync('.husky/pre-commit', hookCommand);

//     // Ensure it's executable on Unix
//     if (process.platform !== 'win32') {
//       fs.chmodSync('.husky/pre-commit', 0o755);
//     }

//     console.log('✔ Husky + lint-staged setup completed for production!');
//   } catch (error) {
//     console.error('❌ Setup failed:', error.message);
//   }
// };

// /*global console*/
// import { execSync } from 'child_process';
// import fs from 'fs';
// import path from 'path';
// import { createRequire } from 'module';
// import process from 'process';

// const require = createRequire(import.meta.url);

// export const huskyLintStagePrep = ({ nodeModulePrefix }) => {
//   try {
//     console.log('☞ Preparing husky + lint-staged pre-commit environment...');

//     // 1. LOCATE THE BINARIES DYNAMICALLY
//     // Instead of hardcoding paths, we find the package root and look in its parent
//     const huskyPkgPath = path.dirname(require.resolve('husky/package.json'));

//     // This finds the .bin folder where npm/pnpm/yarn hoists executables
//     const binFolder = path.resolve(huskyPkgPath, '../../.bin');

//     const huskyBin = path.join(binFolder, 'husky');

//     // 2. RUN HUSKY INIT
//     // We use the absolute path only for this one-time setup
//     execSync(`node "${huskyBin}" init`, { stdio: 'inherit' });

//     // 3. THE PORTABLE HOOK
//     // This hook is safe for Git. It uses 'npx --no-install'.
//     // Since your library is a dependency, lint-staged IS in the user's node_modules.
//     // npx will find it automatically regardless of the OS (Windows/Mac/Linux).
//     const hookCommand = `npx --no-install lint-staged --config ${nodeModulePrefix}lint-staged.config.js`;

//     if (!fs.existsSync('.husky')) {
//       fs.mkdirSync('.husky', { recursive: true });
//     }

//     fs.writeFileSync('.husky/pre-commit', hookCommand);

//     // Ensure it's executable on Unix systems
//     if (process.platform !== 'win32') {
//       fs.chmodSync('.husky/pre-commit', 0o755);
//     }

//     console.log('✔ Husky + lint-staged setup completed for production!');
//   } catch (error) {
//     console.error('❌ Setup failed:', error.message);
//   }
// };

// /*global console*/
// import { execSync } from 'child_process';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const huskyLintStagePrep = ({ nodeModulePrefix }) => {
//   try {
//     console.log('☞ Preparing husky + lint-staged pre-commit environment...');

//     // 1. Still use absolute path ONLY for the initial setup execution
//     const libraryBinPath = path.resolve(__dirname, '../../node_modules/.bin');
//     const huskyBin = path.join(libraryBinPath, 'husky');
//     execSync(`node "${huskyBin}" init`, { stdio: 'inherit' });

//     // 2. THE SECURE HOOK: Use a relative path calculation
//     // This looks for the library inside the local node_modules of whoever is running it.
//     const preCommitContent = `#!/bin/sh
// # Dynamically find the path to the shared library's binaries
// LIB_BIN="./node_modules/@build-in-blocks/dev.setup/node_modules/.bin"

// # Fallback check: if it's hoisted (flat install), check the root bin
// if [ ! -d "$LIB_BIN" ]; then
//   LIB_BIN="./node_modules/.bin"
// fi

// export PATH="$PATH:$LIB_BIN"

// lint-staged --config ${nodeModulePrefix}lint-staged.config.js
// `;

//     if (!fs.existsSync('.husky')) {
//       fs.mkdirSync('.husky', { recursive: true });
//     }

//     fs.writeFileSync('.husky/pre-commit', preCommitContent, { mode: 0o755 });

//     console.log('✔ Husky + lint-staged pre-commit setup completed safely!');
//   } catch (error) {
//     console.error('❌ Setup failed:', error.message);
//   }
// }
