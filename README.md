# @build-in-blocks/dev.setup

**Supported Node.js versions:** Node.js v20.x, v22.x, v24.x and v25.x

#

**Description:** Code linting, formatting, pre-commit hook and GitHub actions development environment setup for your `typescript` code repository.

#

**How it works:** Using code quality checks from `eslint`, `husky` works with `lint-staged` to prevent code that don't meet your code quality requirements, from being commited to git and pushed to your repository's remote - it also formats your code with `prettier` based on your code formatting preferences at this point. `GitHub Actions` then runs the code quality and node version compatibilty checks on pull requests, on push or on merge to your repository's `develop` and/or `main` branch. Ensuring code from all code contributors working on your project pass through the quality checks that you've configured.

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

- Create a `eslint.config.mjs` file at root of your project and add this setup:

  ````
  // @ts-check

  import { defineConfig } from 'eslint/config';
  import blocksDevSetupConfig from '@build-in-blocks/dev.setup';

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

- Create a `prettier.config.js` file at root of your project and add this setup:

  ````
  import basePrettier from '@build-in-blocks/dev.setup/prettier';

  export default {
    //-------------------------------
    // USE OUR PRECONFIGURED SETTINGS
    //-------------------------------
    ...basePrettier,
  };
  ````
- Use `"type": "module"` in your `package.json` file. If you don't use it, you may run into errors as shown in the **troubleshooting** section at the end of this installation guide.

#### 4. Husky + lint-staged installation and setup

> [!NOTE]  
> **Before you proceed with husky setup:** Your project must be a git repository, and you must have made at least one commit to git. If you have done that already, then proceed to follow the husky-related step below. If it's not a git repository, first run the `git init` command at the root of your project to initialize it as a git repository, add and commit one or more files to git as needed, then proceed to follow the husky-related steps below.

- Install the same husky and lint-staged package versions that our dev setup uses in your project:

  ````
  npm i -D husky@^9.1.7 lint-staged@^16.3.2
  ````

- Initialize husky and lint-staged:

  ````
  npx husky-ls-config-init
  ````

  > [!NOTE]  
  > After doing the above, husky will automatically add the `"prepare": "husky"` npm script command to your `package.json` file. Do not remove this script command, this is what husky will use to automate the process.


#### 5. Git commit test - Check that what you've setup so far works

- **Add this incorrectly formatted code:** Create a `.ts` file (in the `TARGET_FOLDER` that you specified in your eslint config i.e. `src` folder in this case). Copy and paste this sample code (just as it is) into the `.ts` file (don't make any corrections to the code):

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

- **Check that eslint errors prevent commit:** Add and commit your `.ts` file to git. You should see that it prevents the commit due to `eslint` error alert in the file(s) committed to git.

- **Check that prettier formats code on commit:** Only fix the eslint errors shown in your terminal, leave any other inconsistent formatting. Add and commit your `.ts` file to git. You should see that the code in the file(s) commited to git has been formatted properly by `prettier`, and the commit is also successful.

- **Eslint + typescript intellisense:** Additinally, you should already be able to see `eslint` + `typescript` intellisense working in your code editor i.e. red and yellow wiggly lines in the new `.ts` file - that is `eslint` notifying you about the code quality-related errors and warnings present in the code. If the intellisense isn't showing for you, see the **troubleshooting** section at the end of this installation guide.


#### 6. Running Eslint and prettier manually without husky

- Add eslint and prettier script commands to your scripts in your project's `package.json` file:

  ````
  "scripts": {
    "eslint:lint": "eslint .",
    "prettier:format": "prettier --write \"**/*.{js,ts,css,html}\""
    // your other npm scripts in your project goes here as usual
  },
  ````

  > [!NOTE]  
  > The presence of `eslint:lint` script command in your package.json will be useful later on, when GitHub actions runs on your pull requests, on push and on merge.

 - Run the eslint script command at the root of your project to see eslint errors and warnings for all affected files in your terminal:
  
    ````
    npm run eslint:lint
    ````

 - Run the prettier script command at the root of your project to see prettier fix code formatting-related inconsistencies for all affected files:
  
    ````
    npm run prettier:format
    ````


#### 7. GitHub Actions setup

- Add `.github/workflows/blocks-ci.yml` file in your project, and paste the workflow code below into the file:

  ````
  name: Blocks CI
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
      uses: build-in-blocks/dev.setup/.github/workflows/central-node-ci.yml@v1.0.1
      with:
        run_tests: true
        # -------------------------------------------------
        # You can pass multiple scripts separated by spaces
        # -------------------------------------------------
        extra_scripts: ""
  ````
  > [!IMPORTANT]  
  > Make sure the version used in the .yml file's `call-shared-logic` in `uses: build-in-blocks/dev.setup/.github/workflows/central-node-ci.yml@v[VERSION_NUMBER_HERE]`, is the same as the version of the `@build-in-blocks/dev.setup` package in your `package.json` file.

 - Add the scripts you'd like to run in `extra_scripts` e.g. if you'd like the CI to run `build` and `e2e` npm scripts from your `package.json` file, update the extra_scripts like so:

    ````
      # -------------------------------------------------
      # You can pass multiple scripts separated by spaces
      # -------------------------------------------------
      extra_scripts: "build e2e"
    ````

    > [!NOTE]  
    > The ci already runs some scripts by default - See [docs.users README.md](https://github.com/build-in-blocks/dev.setup/blob/develop/docs.users/README.md) for more info on this.

- Add and commit your setup files. Once you push to or make a pull request that points to `develop` branch or `main` branch, you should see the CI running on the pull request, on push and on merge. 

  > [!NOTE]  
  > You can update the name of the branches in the `.yml` file, remove or add as you see fit, based on what branch names your repository uses.


#### 8. Extra notes

Make sure to add and commit all your setup files to git, and push/merge it to your remote on GitHub. Once you do this, any contributor who clones your project's repository (or pull these new changes) will automatically have these settings work for them. All they have to do is clone the repository and install the packages in your project's `package.json` as usual - that's all!
 

#### 9. Troubleshooting

- **Eslint + typescript intellisense:** If the `eslint` + `typescript` intellisense is not showing red and yellow wiggle lines in your file, first check that you have `eslint` extension installed in your code editor (that is, if you are using VScode). If you have the extension and it still doesn't show up, closing and reopening your code editor (or just the file you are editing) may fix it.
- **prettier --write: Warning: Failed to load the ES module**: To solve this, use `"type": "module"` in your `package.json` file. For now, you will need this to be present so that you don't run into errors. In subsequent versions/releases we will work on making it work regardless of the type you use in your package.json

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
