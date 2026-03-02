
# User guide: @build-in-blocks/dev.setup package installation, setup and usage

**@build-in-blocks/dev.setup** provides TS development environment setup and comes with preconfigured settings. It helps to automate code compatibilty, quality and formatting checks within your typescript code repository's Git workflow, ensuring that only clean, consistent code is committed to the repository. It also includes GitHub actions setup for running these checks on the contributions submitted to your repository, by your open source contributors or work colleagues. Of course, you can configure it to use your preferred settings too.

#

### User installation instructions

User installation and setup instructions can in the [root README.md](https://github.com/build-in-blocks/dev.setup).

#

### Preconfigured Eslint alert settings

#### Eslint errors
- ❌ Inconsistent variable or function naming styles - default: camelCase ✅
- ❌ Double quotes - default: single quotes ✅
- ❌ Unrecognised tab indent spacing - default: 2 ✅
- ❌ Unused variables
- ❌ Trailing spaces

#### Eslint warnings
- ⚠️ `console.log` usage 

# 

### Configuring your preferred settings

#### 1. Updating Eslint settings

You can find more detailed guidance in eslint and typescript-eslint documentation. Here's an example of how to make your project use `snake_case`, instead of our default `camelcase` naming convention for variables and functions:

````
// @ts-check

import { defineConfig } from 'eslint/config';
import blocksDevSetupConfig from '@build-in-blocks/dev.setup';

// NOTE: Change folder name to where your ts files reside
const TARGET_FOLDER = 'src';
const TARGET_FILES = `${TARGET_FOLDER}/**/*.{ts,js,tsx}`;

export default defineConfig([
  // 1. USE OUR PRECONFIGURED SETTINGS FIRST
  blocksDevSetupConfig.map(config => ({
    ...config,
    files: [TARGET_FILES],
  })),

  // 2. THE OVERRIDE: Add your preferred lint alert settings
  {
    files: [TARGET_FILES], // You also have to include target files here too.
    rules: {
      // A. Turn of dev setup library's camelcase default
      'camelcase': 'off',

      // B. "Scream" if variable or function names don't follow the underscore (i.e. snake_case) pattern
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: "default",
          format: ['snake_case'],
          // C. Let's allow leading underscore in variable or function names e.g _myVariableName
          leadingUnderscore: 'allow',
        }
      ],
    }
  }
]);
````
