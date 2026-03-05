
# User guide: @build-in-blocks/dev.setup package installation, setup and usage

**@build-in-blocks/dev.setup** provides TS development environment setup and comes with preconfigured settings. It helps to automate code compatibilty, quality and formatting checks within your typescript code repository's Git workflow, ensuring that only clean, consistent code is committed to the repository. It also includes GitHub actions setup for running these checks on the contributions submitted to your repository, by your open source contributors or work colleagues. Of course, you can configure it to use your preferred settings too.

#

### User installation instructions

User installation and setup instructions can in the [root README.md](https://github.com/build-in-blocks/dev.setup).

#

### Preconfigured Eslint alert settings

#### Eslint warnings
- ⚠️ `console.log` usage 

#### Eslint errors
- ❌ Unused variables
- ❌ Inconsistent variable or function naming styles - default: camelCase ✅

````
{
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    camelcase: 'error',
  },
},

````

# 

### Preconfigured Prettier formatting settings

In addition to prettier's default settings, our preconfigured settings tells prettier to always format your code like so:
- Use 2 spaces for indentation (instead of tabs)
- Use single quote for strings
- Add trailing comma to the last item in an object
- End every single code statement with a semicolon
- Ensure that every file ends with exactly one empty line

````
{
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  endOfLine: 'lf',
};
````

# 

### Preconfigured Husky + lint-staged settings

- Run eslint and prettier anytime a developer tries to commit code to git.
- Prevent revent code commit to git when any of the code linting and formatting requirements are not met.

# 

### Configuring your preferred settings

#### 1. Updating Eslint settings

You can find more detailed guidance in eslint and typescript-eslint documentation. Here's an example of how to make your project use `snake_case`, instead of our default `camelcase` naming convention for variables and functions:

````
// @ts-check

import { defineConfig } from 'eslint/config';
import blocksDevSetupConfig from '@build-in-blocks/dev.setup';

const TARGET_FOLDER = 'src'; // NOTE: Change folder name to where your ts files reside
const TARGET_FILES = `${TARGET_FOLDER}/**/*.{ts,js,tsx}`;

export default defineConfig([
  //---------------------------------------------------------------------------
  // 1. USE OUR PRECONFIGURED SETTINGS & UPDATE IT WITH YOUR TARGET FILES FIRST
  //---------------------------------------------------------------------------
  blocksDevSetupConfig.map(config => ({
    ...config,
    files: [TARGET_FILES],
  })),

  //--------------------------------------------------------
  // 2. THE OVERRIDE: Add your preferred lint alert settings
  //--------------------------------------------------------
  {
    files: [TARGET_FILES], // NOTE: You also have to include target files here too.
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
    },
  },
]);
````

#### 2. Updating Prettier settings

You can find more detailed guidance in prettier's documentation. Here's an example of how to make your project use `tabs` with indent of `4`, instead of our "use spaces with index of 2" default:

````
import basePrettier from '@build-in-blocks/dev.setup/prettier';

export default {
  //----------------------------------------
  // 1. USE OUR PRECONFIGURED SETTINGS FIRST
  //----------------------------------------
  ...basePrettier,

  //-----------------------------------------
  // 2. YOUR PREFERRED CONFIGURATION SETTINGS
  //-----------------------------------------
  useTabs: true,
  tabWidth: 4,
};
````
