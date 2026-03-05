#!/usr/bin/env node

import { huskyLintStagePrep } from './common/common.husky.lint-staged.js';

huskyLintStagePrep({
  nodeModulePrefix: 'node_modules/@build-in-blocks/dev.setup/',
});
