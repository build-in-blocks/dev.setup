#!/usr/bin/env node

/*global console*/

import { fs, path, execSync, process } from '../config.root/external.packages.js';
import { blocksTerminalLogger } from '../config.root/blocks.packages.js';
import { internalPkgJSON, __dirname, isWindowsOS, windowsCmdextension } from '../config.root/root.js';

const internalCommand = 'blocks.pkg.dev.setup';

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
  const userAppPkgJSON = JSON.parse(fs.readFileSync(path.join(userAppRoot, 'package.json'), 'utf-8'));
  //-
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
    console.log('[PREPARING] Setting up husky git hooks...');
    try {
      const huskyInitCmd = isWindowsOS ? `husky${windowsCmdextension}` : `node "${huskyBin}"`; // This check makes it compatible with Windows OS (in production)
      execSync(huskyInitCmd, { stdio: 'inherit' });
      const preCommitPath = path.join(userAppRoot, '.husky/pre-commit');

      //-------------------------------------------------------------------------
      // Use the (original) internalCommand to ensure portability in the User App
      //-------------------------------------------------------------------------
      const hookContent = `${internalCommand} ${userAppArg.internalLint}`;

      fs.writeFileSync(preCommitPath, hookContent, { mode: 0o755 });

      console.log('[SUCCESS] Husky git hooks integrated successfully.');
    } catch {
      blocksTerminalLogger({
        startLoggerMessageOnNewLine: true,
        internalPackage: {
          fullName: internalPkgJSON.name,
        },
        userApp: {
          fullName: userAppPkgJSON.name,
          errorMessage: 'Husky git hook setup failed.',
        },
        errorSource: true,
        suggestion: {
          // prettier-ignore
          messageList: [
            '→ [Step 1] Run "git init" at the root of your project to make it a git repository.',
            '→ [Step 2] Add and commit one or more files to git.',
            '→ [Step 3] Try the prepare script again, after you\'ve done steps 1 & 2 above.',
          ],
        },
        processExit: true,
      });
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
      const pathKey = isWindowsOS ? Object.keys(process.env).find((k) => k.toUpperCase() === 'PATH') || 'PATH' : 'PATH';

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

      const lintStagedBinCmd = isWindowsOS ? `lint-staged${windowsCmdextension}` : `node "${lintStagedBin}"`; // This check makes it compatible with Windows OS (in production)
      execSync(`${lintStagedBinCmd} --config "${configPath}"`, {
        stdio: 'inherit',
        cwd: userAppRoot,
        env,
      });
    } catch {
      process.exit(1);
    }
  }
}
