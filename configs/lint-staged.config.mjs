
import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const resolveBin = (pkgName, binRelativePath) => {
    const pkgRoot = path.dirname(require.resolve(`${pkgName}/package.json`));
    return `node ${path.join(pkgRoot, binRelativePath)}`;
};

const eslint = resolveBin('eslint', 'bin/eslint.js');
const prettier = resolveBin('prettier', 'bin/prettier.cjs');

export default {
    '*.{mjs,js,ts}': [
        // We use absolute paths to binaries to avoid ENOENT
        `${eslint} --fix --no-warn-ignored`,
        `${prettier} --write`
    ],
    '*.{html,css,scss}': [
        `${prettier} --write`
    ]
};
