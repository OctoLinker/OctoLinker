
# Contributing

First off, thanks for taking the time to contribute! :tada: :+1:

# Developer Guide

## Quick Start

To build and run the extension follow these steps.

0. Clone the repository.
0. Run `npm run bootstrap` to setup the project and install all required dependencies.
0. Start hacking. If you're adding a plugin, you may be interested in seeing the commits that add these plugins:
   * [Homebrew]
   * [Ruby]
   * [Composer]
   * [Bower]
0. To build the extension run `./scripts/build`.
0. If installed, deactivate the OctoLinker extension.
0. Load extension https://developer.chrome.com/extensions/getstarted#unpacked.

[Homebrew]: https://github.com/OctoLinker/browser-extension/commit/b6df755208eae0b98e55fdf533b647b5d7bd4f8e
[Ruby]: https://github.com/OctoLinker/browser-extension/commit/d1bcd3101cc868064e4fa8808fb79ccaac9a2ade
[Composer]: https://github.com/OctoLinker/browser-extension/commit/8f5f006888884c9352e06244596ae057fc529fe9
[Bower]: https://github.com/OctoLinker/browser-extension/commit/2541a407c5916b7d99dc61375a56f94dfb5121f1

## Architecture Overview

Every single file on GitHub.com is represented by a blob. Whenever the extension detects a blob it will pass it to the associated plugin. Every [plugin](/lib/plugins) describes one feature.

A [blob](/packages/blob-reader) consists of many attributes. One of these attributes is a reference to the blobs DOM node. The plugin will tweak this DOM node and turn static strings into clickable links. How does this work? There is an npm module for that. It's called [findandreplacedomtext](https://github.com/padolsey/findAndReplaceDOMText/) and it searches for regular expression matches in a given DOM node and wraps each match with a link node.

By convention, this link must have at least the data attribute `data-resolver`. This attribute defines which resolver will be called when a user clicks a link. A [resolver](/lib/resolver) is basicly just a function which returns an array of possible urls/locations for this resource. Depending on the defined resolver the link must have additional attributes. For example the `relative-file` resolver requires a `data-target` attribute which is the actual value for this link e.g. `./lib/core.js`.

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
