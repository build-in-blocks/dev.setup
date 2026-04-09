import { fs, path, fileURLToPath, createRequire } from './external.packages.js';

// ------------------------------------------------
// ESM & Resolution Helpers:
// Recreate 'require' and '__dirname' for ESM scope
// ------------------------------------------------
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//-------------------------------------------------
// Get bin part relative to user app's package.json
//-------------------------------------------------
const binPath = ({ pkgName, binSubPath }) => {
  const _pkgRoot = path.dirname(require.resolve(`${pkgName}/package.json`));
  return path.join(_pkgRoot, binSubPath);
};

const internalProjectRoot = path.join(__dirname, '../', 'package.json');
const internalPkgJSON = JSON.parse(fs.readFileSync(internalProjectRoot, 'utf-8'));

export {
  //-------------------------------
  // Export global access variables
  //-------------------------------
  require,
  __filename,
  __dirname,
  //-
  binPath,
  //-
  internalPkgJSON,
};
