<p align="center">
<a href="https://chrome.google.com/webstore/detail/octo-linker/jlmafbaeoofdegohdhinkhilhclaklkp"><img src="https://cloud.githubusercontent.com/assets/1393946/15162649/647ca490-1704-11e6-8ed8-ef0674e40fc3.png" width="375"/></a
</p>

# What is OctoLinker? [![Build Status](https://travis-ci.org/OctoLinker/browser-extension.svg?branch=master)](https://travis-ci.org/OctoLinker/browser-extension) [![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/octolinker/browser-extension?svg=true&branch=master)](https://ci.appveyor.com/project/stefanbuck/browser-extension)


First of all, it's a browser extension. Once installed, it allows you to navigate through projects on GitHub.com efficiently.

Most projects consist of many files and third party dependencies. Files are referencing other files and / or dependencies by language specific statements like `include` or `require`. Dependencies are most likely declared in a file called manifest e.g. `package.json` or `Gemfile`. The OctoLinker browser extensions makes these references clickable. No more copy and search.

<img src="https://cloud.githubusercontent.com/assets/1393946/17873217/77fa7404-68c4-11e6-94d7-1a3e4cebec58.png" width="780" />

# Install

<a href="https://chrome.google.com/webstore/detail/octolinker/jlmafbaeoofdegohdhinkhilhclaklkp"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_128x128.png" width="48" /></a>
<a href="https://addons.mozilla.org/en-US/firefox/addon/octolinker/"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_128x128.png" width="48" /></a>
<a href="https://addons.opera.com/en/extensions/details/octolinker/"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_128x128.png" width="48" /></a>

Install OctoLinker from [Chrome Web Store](https://chrome.google.com/webstore/detail/octo-linker/jlmafbaeoofdegohdhinkhilhclaklkp), [Mozilla Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/octolinker/) or [Opera Add-ons Store](https://addons.opera.com/en/extensions/details/octolinker/).

# Features

OctoLinker is the easiest and best way to navigate between files and projects on GitHub.com. Files containing the following keywords will now have links that redirect you either to the relative file or to the projects GitHub page. Depending on the value, it may redirect you to an external website like a manual page or another service.

### bower.json (Bower)
- `main`
- `dependencies`
- `devDependencies`
- `resolutions`

### composer.json (Composer)
- `require `
- `require-dev`
- `conflict`
- `replace`
- `provide`
- `suggest`

### Dockerfile (Docker)

- `FROM`

### Homebrew
- `depends_on`
- `conflicts_with`
- `depends_on cask`
- `depends_on formula`

### JavaScript / NodeJS
- `require`
- `import`
- `export`

### package.json (npm)
- `main`
- `bin`
- `browser`
- `dependencies`
- `devDependencies`
- `resolutions`
- `peerDependencies`
- `optionalDependencies`

### Python
- `import`
- `from`

### Ruby
- `require`

### Rubygems
- `gem`

### Rust
- `extern crate`
- `use`

### TypeScript
- `import`
- `<reference path="" />`

### Vim
- `Bundle`
- `NeoBundle`
- `NeoBundleFetch`
- `NeoBundleLazy`

### project.json (.NET Core)
- `dependencies`
- `tools`

# Want to contribute?

Anyone can help make this project better - check out the [Contributing](/CONTRIBUTING.md) guide!

# Feedback please

If you encounter a problem using OctoLinker, or would like to request an enhancement, feel free to create an [issue](https://github.com/OctoLinker/browser-extension/issues) or say hello [@OctoLinker](https://twitter.com/OctoLinker) on twitter.


# Thanks

- My girlfriend for being so patient with me!
- [@josephfrazier_](https://twitter.com/josephfrazier_) for his awesome contributions to this project!
- [art-noir.net](http://art-noir.net) for the awesome mascot and website!
- [@kkamilio](https://twitter.com/kkamilio) and [@WolnyAdrian](https://twitter.com/WolnyAdrian) for teaching me how Ruby works!
- [@TheeApeman](https://twitter.com/TheeApeman) for code review!
- Every early OctoLinker user, which contributed to OctoLinker by writing issues or PRs!
- Everyone I forgot to mention here, but also influenced OctoLinker!

##Backers

[Become a backer](https://opencollective.com/octolinker#backer) and show your support to our open source project. Your donation will help us to cover project expenses and allow the maintainers to dedicate more time for maintenance and new features for everyone.

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WSXA9GCDRMX7W" target="_blank"><img src="https://cloud.githubusercontent.com/assets/1393946/18415802/59e9f2ba-77ff-11e6-942b-e076db4d865c.gif"></a>

<a href="https://opencollective.com/octolinker/backer/0/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/1/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/2/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/3/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/4/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/5/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/6/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/7/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/8/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/9/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/10/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/11/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/12/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/13/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/14/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/15/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/16/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/17/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/18/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/19/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/20/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/21/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/22/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/23/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/24/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/25/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/26/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/27/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/28/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/backer/29/website" target="_blank"><img src="https://opencollective.com/octolinker/backer/29/avatar.svg"></a>


##Sponsors

[Become a sponsor](https://opencollective.com/octolinker#sponsor) and get your logo on our README on Github with a link to your site. 

<a href="https://opencollective.com/octolinker/sponsor/0/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/1/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/2/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/3/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/4/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/5/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/6/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/7/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/8/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/9/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/10/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/11/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/12/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/13/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/14/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/15/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/16/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/17/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/18/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/19/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/20/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/21/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/22/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/23/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/24/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/25/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/26/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/27/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/28/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/octolinker/sponsor/29/website" target="_blank"><img src="https://opencollective.com/octolinker/sponsor/29/avatar.svg"></a>

# Legal and License

The OctoLinker project is not affiliated with, sponsored by, or endorsed by github, inc.

Copyright (c) 2014–present [Stefan Buck](https://github.com/stefanbuck) Licensed under the MIT license.
