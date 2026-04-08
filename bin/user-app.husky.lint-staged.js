#!/usr/bin/env node

/*global console*/

import { fileURLToPath } from 'url';
import path from 'path';
import process from 'process';
import { huskyLintStagePrep } from './common/common.husky.lint-staged.js';

// 1. Get the absolute path to this specific script file
const __filename = fileURLToPath(import.meta.url);

// 2. Get the directory of this script (bin/)
const __dirname = path.dirname(__filename);

// 3. Move up one level to the library root where lint-staged.config.js lives
const libraryRoot = path.resolve(__dirname, '..');

// 4. Calculate the relative path from the User App root (process.cwd()) to the library
const relativePath = path.relative(process.cwd(), libraryRoot);

// 5. Format it as a prefix (ensure it ends with a slash)
const dynamicPrefix = relativePath ? `${relativePath}/` : '';

console.log(dynamicPrefix);

huskyLintStagePrep({
  nodeModulePrefix: 'node_modules/@build-in-blocks/dev.setup/',
});
