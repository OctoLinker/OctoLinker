
# Contributing

First off, thanks for taking the time to contribute! :tada: :+1:

# Developer Guide

## Quick Start

To build and run the extension follow these steps.

0. Clone the repository.
0. Run `npm install` to setup the project and install all required dependencies.
0. Start hacking. If you're adding a plugin, you may be interested in seeing the commits that add these plugins:
   * [Docker]
   * [vimrc]
   * [Rust]
   * [Python]
   * [project.json]
0. Build and load the extension:
   * Chrome:
     0. To build the extension once run `npm run chrome-build` or `npm run chrome-watch` during development.
     0. Load extension https://developer.chrome.com/extensions/getstarted#unpacked.
   * Firefox:
     0. `npm run firefox-open`

[Docker]: https://github.com/OctoLinker/browser-extension/commit/33a2e60
[vimrc]: https://github.com/OctoLinker/browser-extension/commit/7e21743
[Rust]: https://github.com/OctoLinker/browser-extension/commit/51983b0
[Python]: https://github.com/OctoLinker/browser-extension/commit/963cf15
[project.json]: https://github.com/OctoLinker/browser-extension/commit/7c7293b

## Architecture Overview

Every single file on GitHub.com is represented by a blob. Whenever the extension detects a blob it will pass it to the associated plugin. Every [plugin](/lib/plugins) describes one feature.

A [blob](/packages/blob-reader) consists of many attributes. One of these attributes is a reference to the blobs DOM node. The plugin will tweak this DOM node and turn static strings into clickable links. How does this work? There is an npm module for that. It's called [findandreplacedomtext](https://github.com/padolsey/findAndReplaceDOMText/) and it searches for regular expression matches in a given DOM node and wraps each match with a link node.

By convention, this link must have at least the data attribute `data-resolver`. This attribute defines which resolver will be called when a user clicks a link. A [resolver](/lib/resolver) is basically just a function which returns an array of possible urls/locations for this resource. Depending on the defined resolver the link must have additional attributes. For example the `relative-file` resolver requires a `data-target` attribute which is the actual value for this link e.g. `./lib/core.js`.

As mentioned, if a user clicks on a link, the associated resolver will be called and returns an array of urls. For every url a HTTP HEAD request is made (to determine if the resource is available or not) until one was successful. Finally, a redirect will be invoked. That’s it.

The outline above is an extremely simplified version. In real life you have to deal with a lot of edge cases. If you are interested in some of these edge cases check out the `npm-manifest` plugin and the `javascriptUniversal` resolver.

## Pull Request Guidelines

- Please check to make sure that there aren't existing pull requests attempting to address the issue mentioned. We also recommend checking for issues related to the issue on the tracker, as a team member may be working on the issue in a branch or fork.
- Non-trivial changes should be discussed in an issue first
- Develop in a topic branch, not master
- Lint the code by `npm run lint`
- Add relevant tests to cover the change
- Make sure test-suite passes: `npm test`
- Squash your commits
- Write a convincing description of your PR and why we should land it

## Release Checklist

- Run [`npm version patch`](https://docs.npmjs.com/cli/version) to update the version number. Use `minor` or `major` instead of `patch` if needed (see [semver.org](http://semver.org/) for details).
- Open a [pull request](https://github.com/OctoLinker/browser-extension/pulls) with the new version.
- Once the pull request is merged in, tag the resulting commit as `vX.Y.Z` (where `X`, `Y`, `Z` are the major, minor, and patch versions).
- Push the tag to GitHub. This will trigger Travis CI to create a new [GitHub Release](https://github.com/OctoLinker/browser-extension/releases) and submit the new Chrome extension to the Chrome Web Store. See [.travis.yml](https://github.com/OctoLinker/browser-extension/blob/master/.travis.yml) for details.
- Submit `firefox-octolinker-X.Y.Z.zip` from the [GitHub Release](https://github.com/OctoLinker/browser-extension/releases) to [addons.mozilla.org](https://addons.mozilla.org/en-US/developers/addon/octolinker/versions#version-upload). Be sure to include the `Source code (zip)` file from the release as well.
- Submit `opera-octolinker-X.Y.Z.zip` from the [GitHub Release](https://github.com/OctoLinker/browser-extension/releases) to [addons.opera.com](https://addons.opera.com/developer/package/226344/?tab=versions). Afterwards, go to the [Conversation tab](https://addons.opera.com/developer/package/226344/?tab=conversation), add a link to the `Source code (zip)` file and copy/paste the build instructions from previous releases.
- Update release notes at https://github.com/OctoLinker/browser-extension/releases/tag/vX.Y.Z. You can find a list of changes since the previous release at https://github.com/OctoLinker/browser-extension/compare/vA.B.C...vX.Y.Z, where `A.B.C` is the previous version number.
