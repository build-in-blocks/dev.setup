import { path, process } from '../config.root/external.packages.js';
import { binPath } from '../config.root/root.js';

const userAppRoot = process.cwd();

  const resolveBin = ({ pkgName, binRelativePath }) => {
      const _binPath = binPath({ pkgName, binSubPath: binRelativePath });
      return `node ${_binPath}`;
  };

const eslint = resolveBin({ pkgName: 'eslint', binRelativePath: 'bin/eslint.js' });
const prettier = resolveBin({ pkgName: 'prettier', binRelativePath: 'bin/prettier.cjs' });

//--------------------------------------------
// Automatically detect the user's config file
//--------------------------------------------
const userEslintConfig = path.resolve(userAppRoot, 'eslint.config.mjs');
const userPrettierConfig = path.resolve(userAppRoot, 'prettier.config.mjs');

// console.log(userAppRoot, prettier)

export default {
    '*.{mjs,js,ts}': [
        //-------------------------------------------------
        // Using absolute paths to binaries to avoid ENOENT
        //-------------------------------------------------
        `${eslint} --config "${userEslintConfig}" --fix --no-warn-ignored`,
        `${prettier} --config ${userPrettierConfig} --write --ignore-unknown`
    ],
    '*.{json,html,css,scss}': [
        `${prettier} --config ${userPrettierConfig} --write --ignore-unknown`
    ]
}