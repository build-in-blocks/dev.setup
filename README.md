# @build-in-blocks/dev.setup

![Latest Version](https://img.shields.io/npm/v/@build-in-blocks/dev.setup.svg?label=latest&color=brightgreen&style=flat-square) ![NPM Downloads](https://img.shields.io/npm/d18m/%40build-in-blocks%2Fdev.setup?color=blue&label=downloads%20(last%2018%20months)) ![build passing](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)

[![License: AGPL v3.0](https://img.shields.io/badge/license-AGPL%20v3.0-blue.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0) [![All Contributors](https://img.shields.io/github/all-contributors/build-in-blocks/dev.setup?color=ee8449&style=flat-square)](#contributors) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/build-in-blocks/dev.setup/blob/develop/docs.contributors/README.md)

#

**Built with:** Node.js v24.0.2

#

**Supported Node.js versions:** Node.js v20.x, v22.x, v24.x and v25.x - Monitored by (internal) central Blocks CI

#

**Overview:** Code linting, formatting, pre-commit hook and GitHub actions development environment setup for your `typescript` code repository.

#

**Description:** **@build-in-blocks/dev.setup** provides TS development environment setup and comes with preconfigured settings. It helps to automate code compatibilty, quality and formatting checks within your typescript code repository's Git workflow, ensuring that only clean, consistent code is committed to the repository. It also includes GitHub Actions Continuous Integration (CI) setup for running these checks on the contributions submitted to your repository, by your open source contributors or work colleagues. Of course, you can configure it to use your preferred settings too.

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

- Install our dev setup package as a `devDependency` in your project:

  ````
  npm install -D @build-in-blocks/dev.setup --save-exact
  ````

- Also make sure to install the resources package, so that your project's code can compile successfully without errors:
  
  ````
  npm install -D @build-in-blocks/dev.resources --save-exact
  ````

#### 2. When to install `typescript`

If you are using both this library and [@build-in-blocks/dev.build](https://www.npmjs.com/package/@build-in-blocks/dev.build) together in your project, then you don't need to install `typescript` in your project (the **@build-in-blocks/dev.build** library already does that internally, relative to your project). 

Otherwise, you'll need to manually install `typescript` in your project. See `typescript` table in the general guide for more information: [Typescript compatibility and usage](https://github.com/build-in-blocks/.github/wiki/Repo-User-Guide-Extension#table-typescript-compatibility-and-usage).

#### 3. Eslint config setup


Create a `eslint.config.mjs` file at root of your project and add this setup:

````
// @ts-check

import { defineConfig, blocksDevSetupBaseConfig } from '@build-in-blocks/dev.setup';

//-------------------------------------------------------
// NOTE: Change folder name to where your ts files reside
//-------------------------------------------------------
const TARGET_FOLDER = 'src';
const TARGET_FILES = `${TARGET_FOLDER}/**/*.{mjs,ts,js}`;

export default defineConfig([
  //------------------------------------------------------------------
  // USE OUR PRECONFIGURED SETTINGS & UPDATE IT WITH YOUR TARGET FILES
  //------------------------------------------------------------------
  blocksDevSetupBaseConfig.map((/** @type {any} */ config) => ({
    ...config,
    files: [TARGET_FILES],
  })),
]);
````


#### 4. Prettier installation and setup

Create a `prettier.config.mjs` file at root of your project and add this setup:

````
import basePrettier from '@build-in-blocks/dev.setup/prettier';

export default {
  //-------------------------------
  // USE OUR PRECONFIGURED SETTINGS
  //-------------------------------
  ...basePrettier,
};
````

#### 5. Husky + lint-staged initial setup

> [!NOTE]  
> **Before you proceed with husky setup:** Your project must be a git repository, and you must have made at least one commit to git. If you have done that already, then proceed to follow the husky-related step below. If it's not a git repository, first run the `git init` command at the root of your project to initialize it as a git repository, add and commit one or more files to git as needed, then proceed to follow the husky-related steps below.

- **Add the prepare script:** In your web project's `package.json` file, add the `prepare` script.

  - For `macOS` and `linux`, use:

    ````
    "scripts": {
      "prepare": "blocks.pkg.dev.setup dev:husky:setup:git"
      // your other npm scripts in your project goes here as usual
    },
    ````

  - For `windows OS`, use:

    ````
    "scripts": {
      "prepare": "blocks.pkg.dev.setup.cmd dev:husky:setup:git"
      // your other npm scripts in your project goes here as usual
    },
    ````

- **Init git hooks:** Initialize `husky` and `lint-staged` git hooks by running this script command:

  ````
  npm run prepare
  ````

  > [!NOTE]  
  > After doing the above, husky will add the `.husky` folder with content including the `pre-commit` file. Make sure to add and commit this `pre-commit` file to git.


#### 6. Git commit test - Check that what you've setup so far works

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


#### 7. Running Eslint and prettier manually without husky

- Add eslint and prettier script commands to your scripts in your project's `package.json` file:

  ````
  "scripts": {
    "eslint:lint": "eslint .",
    "prettier:format": "prettier --write \"**/*.{mjs,ts,js,json,html,css,scss}\"",
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


#### 8. GitHub Actions setup

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
      uses: build-in-blocks/dev.setup/.github/workflows/central-blocks-ci.yml@v1.0.5
      with:
        run_tests: true
        # -------------------------------------------------
        # You can pass multiple scripts separated by spaces
        # -------------------------------------------------
        extra_scripts: ""
  ````
  > [!IMPORTANT]  
  > Make sure the version used in the .yml file's `call-shared-logic` in `uses: build-in-blocks/dev.setup/.github/workflows/central-blocks-ci.yml@v[VERSION_NUMBER_HERE]`, is the same as the version of the `@build-in-blocks/dev.setup` package in your `package.json` file.

 - Add the scripts you'd like to run in `extra_scripts` e.g. if you'd like the CI to run `build` and `e2e` npm scripts from your `package.json` file, update the extra_scripts like so:

    ````
      # -------------------------------------------------
      # You can pass multiple scripts separated by spaces
      # -------------------------------------------------
      extra_scripts: "build e2e"
    ````

    > [!NOTE]  
    > The GitHub Actions CI already runs some scripts by default - See [docs.users README.md](https://github.com/build-in-blocks/dev.setup/blob/develop/docs.users/README.md) for more info on this.

- Add and commit your setup files. Once you push to or make a pull request that points to `develop` branch or `main` branch, you should see the CI running on the pull request, on push and on merge. 

  > [!NOTE]  
  > You can update the name of the branches in the `.yml` file, remove or add as you see fit, based on what branch names your repository uses.


#### 9. Extra notes

Make sure to add and commit all your setup files to git, and push/merge it to your remote on GitHub. Once you do this, any contributor who clones your project's repository (or pull these new changes) will automatically have these settings work for them. All they have to do is clone the repository and install the packages in your project's `package.json` as usual - that's all!
 

#### 10. Troubleshooting

**Eslint + typescript intellisense:** If the `eslint` + `typescript` intellisense is not showing red and yellow wiggly lines in your code file, first check that you have `eslint` extension installed in your code editor (that is, if you are using VScode). If you have the extension and it still doesn't show up, closing and reopening your code editor (or just the file you are editing) may fix it.

#

### Contributors

Thanks to these amazing contributors to the **@build-in-blocks/dev.setup** project. This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. See [emoji key](https://allcontributors.org/docs/en/emoji-key). Contributions of any kind welcome!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/Ifycode"><img src="https://avatars.githubusercontent.com/u/45185388?v=4?s=100" width="100px;" alt="Mary @Ifycode"/><br /><sub><b>Mary @Ifycode</b></sub></a><br /><a href="https://github.com/build-in-blocks/dev.setup/commits?author=Ifycode" title="Code">💻</a> <a href="https://github.com/build-in-blocks/dev.setup/commits?author=Ifycode" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/apps/allcontributors"><img src="https://avatars.githubusercontent.com/in/23186?v=4?s=100" width="100px;" alt="allcontributors[bot]"/><br /><sub><b>allcontributors[bot]</b></sub></a><br /><a href="#tool-allcontributors[bot]" title="Tools">🔧</a> <a href="https://github.com/build-in-blocks/dev.setup/commits?author=allcontributors[bot]" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
