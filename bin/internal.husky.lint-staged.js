#!/usr/bin/env node

/*global console*/

import { fileURLToPath } from 'url';
import path from 'path';
import process from 'process';
import { huskyLintStagePrep } from './common/common.husky.lint-staged.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const libraryRoot = path.resolve(__dirname, '..');

// In local dev, this will result in an empty string
const relativePath = path.relative(process.cwd(), libraryRoot);
const dynamicPrefix = relativePath ? `${relativePath}/` : '';

console.log(dynamicPrefix);

huskyLintStagePrep({
  nodeModulePrefix: dynamicPrefix,
});
