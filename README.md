# @build-in-blocks/dev.setup

**Supported Node.js versions:** Node.js v20.x to v25.x

#

**Description:** Code linting, formatting, pre-commit hook and GitHub actions (including node version compatiblity check) development environment setup for your typescript code repository.

#

**User guide:** See [docs.users README.md](https://github.com/build-in-blocks/dev.setup/blob/develop/docs.users/README.md)

#

### Quick installation guide

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
    // USE & UPDATE OUR PRECONFIGURED SETTINGS WITH TARGET FILES FIRST
    blocksDevSetupConfig.map(config => ({
      ...config,
      files: [TARGET_FILES],
    })),
  ]);
  ````

- Add eslint script command to your scripts in your project's package.json:

  ````
  "scripts": {
      "lint": "eslint .",
      // add other npm scripts your project needs as usual
  },
  ````

- Add code to the .ts files in your project as needed. Run the `npm run lint` script command at the root of your project to see eslint errors and warnings.
