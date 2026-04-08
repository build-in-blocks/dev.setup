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

export default {
    '*.{mjs,js,ts}': (filenames) => {
        // We map the filenames to ensure they are quoted for the shell
        const files = filenames.join(' ');
        return [
            `${eslint} --config "${userEslintConfig}" --fix --no-warn-ignored ${files}`,
            `${prettier} --config "${userPrettierConfig}" --write --ignore-unknown ${files}`
        ];
    },
    '*.{json,html,css,scss}': (filenames) => {
        const files = filenames.join(' ');
        return [
            `${prettier} --config "${userPrettierConfig}" --write --ignore-unknown ${files}`
        ];
    }
}