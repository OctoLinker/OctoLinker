# OctoLinker E2E Tests

## What is E2E Testing?

E2E stand for End to End testing and the following lines from [Protractor](https://docs.angularjs.org/guide/e2e-testing) explain it the best:

> As applications grow in size and complexity, it becomes unrealistic to rely on manual testing to verify the correctness of new features, catch bugs and notice regressions. Unit tests are the first line of defense for catching bugs, but sometimes issues come up with integration between components which can't be captured in a unit test. End-to-end tests are made to find these problems.

### How we do E2E tests

We're using [Puppeteer](https://github.com/GoogleChrome/puppeteer) which allows us to spin up a Chrome instance which then loads the OctoLinker extension. Once Chrome has started we can navigate to any website which is github.com in our case. In this directory we also have a folder called [fixtures](https://github.com/OctoLinker/OctoLinker/tree/master/e2e/fixtures) which contains all our dummy files which we use for testing.

If you open one of those files, you will see a special annotation which we use to specify that the next line should resolve to the given target:

```js
// When the target is an external url
// @OctoLinkerResolve(https://nodejs.org/api/fs.html)
require('fs')

// When the target is a relative file
// @OctoLinkerResolve(<root>/path/to/foo.js)
require('./foo.js')
```

The annotation is language-agnostic so you can also use it for Ruby or any other language:

```ruby
# @OctoLinkerResolve(https://rubygems.org/gems/rake)
require 'rake'
```

It also works within JSON files:

```js
{
  "dependencies": {
    "//": "@OctoLinkerResolve(https://github.com/lodash/lodash)",
    "lodash": "^1.2.3"
  }
}
```

There is also a `OctoLinkerResolveAbove` annotation. This might be needed for situation where the comment doesn't work in the line above for whatever reason.

```js
require('fs')
// @OctoLinkerResolveAbove(https://nodejs.org/api/fs.html)
```

Before we invoke [jest](https://github.com/facebook/jest), we scan the fixtures folder for the annotations described above and write a file named `fixtures.json` to the disk. This JSON file then gets loaded by our actual test file (https://github.com/OctoLinker/OctoLinker/blob/master/e2e/automated.test.js) to scaffold those tests on-the-fly.


```js
[
 {
  "url": "https://github.com/OctoLinker/OctoLinker/blob/master/e2e/fixtures/javascript/nodejs/gentle-resonance-3436.js",
  "content": "require('./proud-tooth-7361');",
  "targetUrl": "/javascript/nodejs/proud-tooth-7361.js",
  "lineNumber": 2
 },
 {
  "url": "https://github.com/OctoLinker/OctoLinker/blob/master/e2e/fixtures/javascript/npm/package.json",
  "content": "\"underscore\": \"1.2.3\"",
  "targetUrl": "https://github.com/jashkenas/underscore",
  "lineNumber": 8
 },
 ...
]
```

## Contribution

We made this process super simple. Just create files within `e2e/fixtures` and make sure the annotations are correct, that's all. If you have a minute or two, we would really appreciate a pull request from you!

By default e2e tests run against the latest OctoLinker master. However, you can overwrite the target as follow `TRAVIS_PULL_REQUEST_SLUG=stefanbuck/OctoLinker TRAVIS_PULL_REQUEST_BRANCH=fix-642 yarn e2e`