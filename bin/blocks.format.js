#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import process from 'process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prettierBin = path.resolve(__dirname, '../node_modules/prettier/bin/prettier.cjs');

const result = spawnSync(
  'node',
  [
    prettierBin,
    '--write',
    '--ignore-unknown', // This prevents the "No files found" errors
    ...process.argv.slice(2),
  ],
  {
    stdio: 'inherit',
    shell: true,
  },
);

process.exit(result.status);
