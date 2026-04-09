#!/usr/bin/env node

/*global console*/

import { fs, path, execSync, process } from '../config.root/external.packages.js';
import { __dirname } from '../config.root/root.js';

const internalCommand = '@build-in-blocks/dev.setup@1.0.4';

const userAppArg = {
  huskyGitSetup: 'dev:husky:setup:git',
  internalLint: 'dev:internal:lint',
};

const args_ = process.argv.slice(2);
const command = args_[0];

const pkgArgDetected = args_.length === 1 && (command === userAppArg.huskyGitSetup || command === userAppArg.internalLint);

if (pkgArgDetected) {
  //-----------------------------------------------------------------
  // Path Resolution from userAppRoot (i.e. this could be from within
  // this library, or the web app that this library is used in).
  //-----------------------------------------------------------------
  const userAppRoot = process.cwd();
  const engineRoot = path.resolve(__dirname, '..');
  const internalModulesPath = path.resolve(engineRoot, 'node_modules');
  const internalBinPath = path.resolve(internalModulesPath, '.bin');

  // -----------------------------------------------
  // Safely find binary paths for the internal tools
  // -----------------------------------------------
  const getBinPath = (pkgName) => {
    //-----------------------------------------------------------------
    // A. Look in the User App's .bin (Production or hoisted)
    // B. Look in the Engine's .bin (Development i.e. local npm link)
    // C. Return the .bin path that match based on environment detected
    //-----------------------------------------------------------------
    const paths = [path.resolve(userAppRoot, 'node_modules/.bin', pkgName), path.resolve(engineRoot, 'node_modules/.bin', pkgName)];

    const found = paths.find((p) => fs.existsSync(p));

    if (!found) {
      throw new Error(`Binary for ${pkgName} not found. Try 'npm install'`);
    }

    return found;
  };

  const huskyBin = getBinPath('husky');
  const lintStagedBin = getBinPath('lint-staged');

  // ---------------------------------------------------------
  // Set up husky to work with git i.e. initially generate the
  // husky folder, with content that includes pre-commit file.
  // ---------------------------------------------------------
  if (command === userAppArg.huskyGitSetup) {
    console.log('🐶 Setting up @build-in-blocks git hooks...');
    try {
      execSync(`node "${huskyBin}"`, { stdio: 'inherit' });
      const preCommitPath = path.join(userAppRoot, '.husky/pre-commit');

      //-------------------------------------------------------------------------------------
      // Use 'npx @build-in-blocks/[library] [command]' to ensure portability in the User App
      //-------------------------------------------------------------------------------------
      const hookContent = `npx ${internalCommand} ${userAppArg.internalLint}`;

      fs.writeFileSync(preCommitPath, hookContent, { mode: 0o755 });

      console.log('✅ Git hooks integrated successfully.');
    } catch {
      console.error('❌ Git hook setup failed.');
    }
  }

  // ----------------------------------------------------
  // Apply linting and formatting on git commit operation
  // ----------------------------------------------------
  if (command === userAppArg.internalLint) {
    const configPath = path.resolve(engineRoot, 'config.programmed/lint-staged.config.mjs');
    try {
      //-----------------------------------------------------
      // Check to detect the correct PATH key. Treat the PATH
      // difference between windows OS and other OS.
      //-----------------------------------------------------
      const pathKey = process.platform === 'win32' ? Object.keys(process.env).find((k) => k.toUpperCase() === 'PATH') || 'PATH' : 'PATH';

      const env = {
        ...process.env,
        [pathKey]: `${internalBinPath}${path.delimiter}${process.env[pathKey]}`,
        NODE_PATH: internalModulesPath,
        NODE_OPTIONS: '--no-warnings',
        //--------------------------------------------------------------------------
        // This prevents lint-staged from using its "smart" backup logic which often
        // causes the "tampering"feel.
        //--------------------------------------------------------------------------
        LINT_STAGED_BACKUP: '0',
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
}
