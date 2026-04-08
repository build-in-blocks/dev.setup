#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import process from 'process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Find the eslint binary inside the library's own node_modules
const eslintBin = path.resolve(__dirname, '../node_modules/eslint/bin/eslint.js');

const result = spawnSync('node', [eslintBin, ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status);
