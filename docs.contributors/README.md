
# Contributor guide: Installation instructions for code contributors

Code contributors to **@build-in-blocks/dev.setup** repository should use this document as a reference guide, to setup this library locally during development.

#

### Community Code of Conduct

Read our code of conduct before you start contributing: https://resources.collabocate.community/contribute/code-of-conduct

#

### Library compatiblity

Compatible `Node.js` version(s) have been specified in the [root README.md](https://github.com/build-in-blocks/dev.setup) of this repository.

#

### Local development instructions

#### Fork and clone this repo

Follow the instructions to fork and clone this repository locally unto your computer from here: https://github.com/build-in-blocks/.github/wiki/Repo-Contributor-Guide-Extension

#### Install dependencies and run project locally

- **Folder structure:** On your computer, create a new parent folder or go to an existing folder that you will like to be the parent, for both this library and your own typescript app. Make sure your cloned `dev.setup` repo folder and your own typescript app are inside the parent folder, so that the structure looks like this:

    ````
    PARENT-FOLDER/
    ├── dev.setup/
    └── your-TS-app/
    ````

- **For library:** Open a terminal specifically for the library, cd into the root of the library folder and run the following script commands.

    Install dependencies:

    ```
    npm install
    ```

    Link library:

    ```
    npm link
    ```

    Complete the setup for husky and lint-staged:

    ````
    npx internal-husky-ls-init
    ````

- **For your TS app:** Open a terminal specifically for your typescript app, cd into the root of your typescript app.

    - **Step 1:** Follow the installation steps in the [root README.md](https://github.com/build-in-blocks/dev.setup), not from the beginning though; start from the **2. Eslint with typescript installation and setup** section (and continue till the end).

    - **Step 2:** Add this to your app's package.json dependencies (take note incase library version changes in the future: use the exact version number in the `@build-in-blocks/dev.setup` library's package.json. At the time of writing, it is 1.0.0):

        ```
        "@build-in-blocks/dev.setup": "1.0.0"
        ```

        Link your app to the library:

        ```
        npm link ../dev.setup
        ```

    - **Step 3:** In your code editor, go to any `.ts` file in your app and update as needed. Check that the preconfigured settings specified in [docs.users README.md](https://github.com/build-in-blocks/dev.setup/blob/develop/docs.users/README.md) are applied.

#

### Contributors

List of awesome people who contributed to this project can be found in the [root README.md](https://github.com/build-in-blocks/dev.setup). 