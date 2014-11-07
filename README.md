 <p align="center">
  <a href="#"><img src="app/images/icon-128.png"/></a>
</p>

# GitHub Linker

[![Chrome Web Store][webstore-image]][webstore-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

The GitHub Linker is a Google Chrome Extension which links [NPM](https://npmjs.org/), [bower](http://bower.io/), [Composer](https://getcomposer.org/) & [Duo](http://duojs.org) dependencies to their GitHub repository page. It also tries to resolve the `require()` value in a `.js` or `.coffee` file.

# Preview

![d](screencast.gif)



# Installation

[![Chrome Web Store][install-image]][webstore-url]



# require() examples
```
// Packages
require('fs') => http://nodejs.org/api/fs.html
require('lodash') => https://github.com/lodash/lodash

// File system
require('./index.js') =>  https://github.com/user/repo/blob/master/index.js
require('./utils/math.js') =>  https://github.com/user/repo/blob/master/utils/math.js

// Duo 
require('user/repo') => https://github.com/user/repo
require('user/repo@master') => https://github.com/user/tree/master
require('user/repo@master:/folder/file.js') => https://github.com/user/repo/blob/master/folder/file.js
```



# Support
Should you have any problems, please open up an [issue](https://github.com/stefanbuck/github-linker/issues).



# License

Copyright (c) 2014 Stefan Buck. Licensed under the MIT license.

[webstore-url]: https://chrome.google.com/webstore/detail/github-linker/jlmafbaeoofdegohdhinkhilhclaklkp
[webstore-image]: http://img.shields.io/badge/version-3.1.3-green.svg
[travis-url]: https://travis-ci.org/stefanbuck/github-linker
[travis-image]: https://travis-ci.org/stefanbuck/github-linker.svg?branch=master
[daviddm-url]: https://david-dm.org/stefanbuck/github-linker.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/stefanbuck/github-linker
[install-image]: install.png
