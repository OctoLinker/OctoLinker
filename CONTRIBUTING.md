
# Contributing

First off, thanks for taking the time to contribute! :tada: :+1:

# Developer Guide

## Quick Start

To build and run the extension follow these steps.

1. Clone the repository.
1. Make sure [Yarn](https://yarnpkg.com/docs/install) is installed.
1. Run `yarn install` to setup the project and install all required dependencies.
1. Start hacking. If you're adding a plugin, you may be interested in seeing the commits that add these plugins:
   * [CSS]
1. Build and load the extension:
   * Firefox (Quickstart):
     1. `yarn firefox-open`
   * Chrome (Quickstart):
     1. `yarn chrome-open`
   * Chrome (Long Version):
     1. To build the extension once run `yarn build` or `yarn watch` during development.
     1. Load extension https://developer.chrome.com/extensions/getstarted#unpacked.

[CSS]: https://github.com/OctoLinker/browser-extension/commit/ccbefb7

## Architecture Overview

Every single file on GitHub.com is represented by a blob. A [blob](/packages/blob-reader) consists of many attributes. One of these attributes is a reference to the blobs DOM node. The plugin will tweak this DOM node and turn static strings into clickable links. How does this work? There is an npm module for that. It's called [findandreplacedomtext](https://github.com/padolsey/findAndReplaceDOMText/) and it searches for regular expression matches in a given DOM node and wraps each match with a link node.

If a user clicks on a link, the associated plugin will be called and returns an array of urls. For every url a HTTP HEAD request is made (to determine if the resource is available or not) until one was successful. Finally, a redirect will be invoked. That’s it.

The outline above is an extremely simplified version. In real life you have to deal with a lot of edge cases. If you are interested in some of these edge cases check out the `npm-manifest` plugin and the `javascriptUniversal` resolver.

## Pull Request Guidelines

- Please check to make sure that there aren't existing pull requests attempting to address the issue mentioned. We also recommend checking for issues related to the issue on the tracker, as a team member may be working on the issue in a branch or fork.
- Non-trivial changes should be discussed in an issue first
- Develop in a topic branch, not master
- Lint the code by `yarn lint`
- Add relevant tests to cover the change
- Make sure test-suite passes: `yarn test`
- Document any new features in [README.md](./README.md#features)
- Squash your commits
- Write a convincing description of your PR and why we should land it

## Release Checklist

- Run [`npm --no-git-tag-version version patch`](https://docs.npmjs.com/cli/version) to update the version number. Use `minor` or `major` instead of `patch` if needed (see [semver.org](http://semver.org/) for details).
  Consider that non-`patch` releases will cause users to receive update notifications, so lean towards a `patch` release for platform-specific stuff.
  See [lib/notification.js](https://github.com/OctoLinker/browser-extension/blob/030859292f7ea4e8a3852a876707c22a6fe74d9a/lib/notification.js#L4).
- Open a [pull request](https://github.com/OctoLinker/browser-extension/pulls) with the new version.
- Once the pull request is merged in, tag the resulting commit as `vX.Y.Z` (where `X`, `Y`, `Z` are the major, minor, and patch versions).
- Push the tag to GitHub. This will trigger Travis CI to create a new [GitHub Release](https://github.com/OctoLinker/browser-extension/releases) and submit the new Chrome extension to the Chrome Web Store. See [.travis.yml](https://github.com/OctoLinker/browser-extension/blob/master/.travis.yml) for details.
- Submit `firefox-octolinker-X.Y.Z.zip` from the [GitHub Release](https://github.com/OctoLinker/browser-extension/releases) to [addons.mozilla.org](https://addons.mozilla.org/en-US/developers/addon/octolinker/versions#version-upload). Be sure to include the `Source code (zip)` file from the release as well.
- Submit `opera-octolinker-X.Y.Z.zip` from the [GitHub Release](https://github.com/OctoLinker/browser-extension/releases) to [addons.opera.com](https://addons.opera.com/developer/package/226344/?tab=versions). Afterwards, go to the [Conversation tab](https://addons.opera.com/developer/package/226344/?tab=conversation), add a link to the `Source code (zip)` file and copy/paste the build instructions from previous releases.
- Update release notes at https://github.com/OctoLinker/browser-extension/releases/tag/vX.Y.Z. You can find a list of changes since the previous release at https://github.com/OctoLinker/browser-extension/compare/vA.B.C...vX.Y.Z, where `A.B.C` is the previous version number.
  Consider that non-`patch` releases will cause users to receive update notifications showing the first line of the release notes.
  See [lib/notification.js](https://github.com/OctoLinker/browser-extension/blob/030859292f7ea4e8a3852a876707c22a6fe74d9a/lib/notification.js#L4).

