# @build-in-blocks/dev.setup

**Supported Node.js versions:** Node.js v20.x, v22.x, v24.x and v25.x

#

**Description:** Code linting, formatting, pre-commit hook and GitHub actions development environment setup for your `typescript` code repository.

#

**How it works:** Using code quality checks from `eslint`, `husky` works with `lint-staged` to prevent code that don't meet your code quality requirements, from being commited to git and pushed to your repository's remote - it also formats your code with `prettier` based on your code formatting preferences at this point. `GitHub Actions` then runs your code quality and node version compatibilty checks on your pull requests, on push or on merge to your `develop` and/or `main` branch.

#

**User guide:** See [docs.users README.md](https://github.com/build-in-blocks/dev.setup/blob/develop/docs.users/README.md)

#

**Contributor guide:** See [docs.contributors README.md](https://github.com/build-in-blocks/dev.setup/blob/develop/docs.contributors/README.md)

#

**Run into any issues?** Report them via our [product issue reports repo](https://github.com/build-in-blocks/product-issue-reports/issues)

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


#### 3. Prettier installation and setup

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

#### 4. Husky + lint-staged installation and setup

- Install the same husky and lint-staged package versions that our dev setup uses in your project:

  ````
  npm i -D husky@^9.1.7 lint-staged@^16.3.2
  ````

- Initialize husky and lint-staged:

  ````
  npx husky-ls-config-init
  ````

#### 5. Package.json Script command setup and test

- Add eslint, prettier and husky script commands to your scripts in your project's package.json:

  ````
  "scripts": {
    "eslint:lint": "eslint .",
    "prettier:format": "prettier --write \"**/*.{js,ts,css,html}\"",
    "prepare": "husky"
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

 - You should already be able to see eslint + typescript intellisense working in your code editor i.e. red and yellow wiggly lines in the new .ts file - that is eslint notifying you about the code quality-related errors and warnings present in the code.
 - Add and commit your .ts file to git. You should see husky format just the file commited based on prettier settings, and prevent the commit due to eslint error alert.


#### 6. GitHub Actions setup

- Add `.github/workflow/app-node-ci.yml` file in your project, and paste the workflow code below in the file.

  ````
  name: App Node CI Quality Check
  on:
    pull_request:
      branches: [ main, develop ]
    push:
      branches: [ main, develop ]

  jobs:
    call-shared-logic:
      # -----------------------------------------------------------------
      # This points to the shared library repository's "central" workflow
      # -----------------------------------------------------------------
      uses: build-in-blocks/dev.setup/.github/workflows/central-node-ci.yml@develop
      with:
        run_tests: true
        # -------------------------------------------------
        # You can pass multiple scripts separated by spaces
        # -------------------------------------------------
        extra_scripts: ""
  ````

 - Add the scripts you'd like to run in `extra_scripts` e.g. if you'd like the ci to run `build` and `e2e` npm scripts from your package.json, update the extra_scripts like so: `extra_scripts: "build e2e"`. The ci already runs some scripts by default - See [docs.users README.md](https://github.com/build-in-blocks/dev.setup/blob/develop/docs.users/README.md) for more info on this.

 - Once you push to or make a pull request that points to `develop` branch or `main` branch, you should see the CI running on the pull request. Note: You can update the name of the branches, remove or add as you see fit, based on what branch names your repository uses.

 
#### 7. Eslint and prettier without husky 

 - Run the eslint script command at the root of your project to see eslint errors and warnings in your terminal:
  
    ````
    npm run eslint:lint
    ````

 - Run the prettier script command at the root of your project to see prettier fix code formatting-related inconsistencies:
  
    ````
    npm run prettier:format
    ````

#### 8. Troubleshooting

If the eslint + typescript intellisense is not showing red and yellow wiggle lines in your file or prettier formatting does not take effect, closing and reopening your code editor (or just the file you are editing) may fix it.

#

### Contributors

[![All Contributors](https://img.shields.io/github/all-contributors/build-in-blocks/dev.setup?color=ee8449&style=flat-square)](#contributors) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/build-in-blocks/dev.setup/blob/develop/docs.contributors/README.md) [![License: AGPL v3.0](https://img.shields.io/badge/License-AGPL%20v3.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/Ifycode"><img src="https://avatars.githubusercontent.com/u/45185388?v=4?s=100" width="100px;" alt="Mary @Ifycode"/><br /><sub><b>Mary @Ifycode</b></sub></a><br /><a href="https://github.com/build-in-blocks/dev.setup/commits?author=Ifycode" title="Code">💻</a> <a href="https://github.com/build-in-blocks/dev.setup/commits?author=Ifycode" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
