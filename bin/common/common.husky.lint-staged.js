/*global console*/

import { execSync } from 'child_process';
import fs from 'fs';

export const huskyLintStagePrep = ({ nodeModulePrefix }) => {
  try {
    console.log('☞ Preparing husky + lint-staged pre-commit environment...');
    execSync('npx husky init', { stdio: 'inherit' });
    //----------------------------------------------------------------------------------------
    // Reference the config file inside the node_modules of the app the uses dev.setup library
    //----------------------------------------------------------------------------------------
    const hook = `npx lint-staged --config ${nodeModulePrefix}lint-staged.config.js`;
    fs.writeFileSync('.husky/pre-commit', hook);
    console.log('✔ Husky + lint-staged pre-commit setup completed!');
  } catch (error) {
    console.error(
      '❌ Husky + lint-staged pre-commit setup failed:\n',
      error.message,
    );
  }
};
