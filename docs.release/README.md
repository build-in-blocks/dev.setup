
# Release guide: For maintainers incharge of publishing the package

> [!NOTE]  
> Before releasing/publishing this package, do the following so that users and contributors are not affected negatively. Once the requirements below are satisfied, you can publish to npm 🎉

- **Confirm package.json & docs content:** Always confirm that the content of the `package.json` (`scripts`, the `keywords` array etc.), as well as the **root README**, **user docs**, **contributor docs** and **release docs** content are in good/acceptable shape for the release.

- **Version bumping:** Pending the time when we will automate the version bumping process, always remember to update the version number to a new one in the `package.json` file.

- **Regenerate lock file:** Changes made to the `package.json` should be made to reflect in the lock file. Delete the `package-lock.json` file and the `node_modules` folder, then run `npm i` to generate a new `package-lock.json` file.

- **Update contributors list:** Check to see that all contributors who contributed to the success of the new release have been added to the **contributors list** on the **root README**.

- **Pull updated develop branch & create tag:** Double check that you have pulled all the latest changes to your **local** `develop` branch. Create a new tag release via the release page: https://github.com/build-in-blocks/dev.setup/releases.
