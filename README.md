# @build-in-blocks/dev.setup

**Supported Node.js versions:** Node.js v20.x to v25.x

#

**Description:** Code linting, formatting, pre-commit hook and GitHub actions (including node version compatiblity check) development environment setup for your typescript code repository.

#

**User guide:** See [docs.users README.md](https://github.com/build-in-blocks/dev.setup/blob/develop/docs.users/README.md)

#

**Contributor guide:** See [docs.contributors README.md](https://github.com/build-in-blocks/dev.setup/blob/develop/docs.contributors/README.md)

#

### Quick user installation guide

> [!NOTE]  
> Also see user guide 👆🏽 for how to configure it to use your preferred settings instead.

#### 1. Main package installation

Install our dev setup in your project:

````
npm install -D @build-in-blocks/dev.setup
````

#### 2. Eslint with typescript installation and setup

- Install the same group of eslint-related and typescript-related package versions that our dev setup uses in your project:

  ````
  npm install -D eslint@^10.0.2 @eslint/js@^10.0.1 typescript@^5.9.3 typescript-eslint@^8.56.1
  ````

- Create an eslint.config.mjs file at root of your project and add this setup:

  ````
  // @ts-check

  import { defineConfig } from 'eslint/config';
  import blocsDevSetupConfig from '@build-in-blocks/dev.setup';

  // NOTE: Change folder name to where your ts files reside
  const TARGET_FOLDER = 'src';
  const TARGET_FILES = `${TARGET_FOLDER}/**/*.{ts,js,tsx}`;

  export default defineConfig([
    //------------------------------------------------------------------
    // USE OUR PRECONFIGURED SETTINGS & UPDATE IT WITH YOUR TARGET FILES
    //------------------------------------------------------------------
    blocksDevSetupConfig.map(config => ({
      ...config,
      files: [TARGET_FILES],
    })),
  ]);
  ````


#### 2. Prettier installation and setup

- Install the same group of prettier-related package versions that our dev setup uses in your project:

  ````
  npm install -D prettier@^3.8.1 eslint-config-prettier@^10.1.8
  ````

- Create a prettier.config.js file at root of your project and add this setup:

  ````
  import basePrettier from '@build-in-blocks/dev.setup/prettier';

  export default {
    //-------------------------------
    // USE OUR PRECONFIGURED SETTINGS
    //-------------------------------
    ...basePrettier,
  };
  ````


#### 3. Package.json Script command setup and test

- Add eslint and prettier script commands to your scripts in your project's package.json:

  ````
  "scripts": {
    "eslint:lint": "eslint .",
    "prettier:format": "prettier --write \"**/*.{js,ts,css,html}\""
    // add other npm scripts your project needs as usual
  },
  ````

- Create a .ts file in the folder specified in your eslint config i.e. `src` folder in this case. Copy and paste this sample code (just as it is) into the .ts file:

  ````
  const test = "";

  const obj = {
    a: 1,
    b: 2,
  };

  const _name_Test = () => {
    return '';
  };

    console.log(_name_Test);

  export const addNumbers = (a: number, b: number): number => {
    return a + b
  }; 

  console.log(addNumbers(4, 5))
  ````

 - You should already be able to see eslint + typescript intellisense working in your code editor i.e. red and yellow wiggly lines in the new .ts file - that is eslint notifying you about the code quality-related errors and warnings present in the code. In addition, run the eslint script command at the root of your project to see eslint errors and warnings in your terminal:
  
    ````
    npm run eslint:lint
    ````

 - Run the prettier script command at the root of your project to see prettier fix code formatting-related inconsistencies:
  
    ````
    npm run prettier:format
    ````

#### 4. Troubleshooting

If the eslint + typescript intellisense is not showing red and yellow wiggle lines in your file or prettier formatting does not take effect, closing and reopening your code editor (or just the file you are editing) may fix it.
