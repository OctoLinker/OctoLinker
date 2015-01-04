# Changelog

## v3.3.0 (2015-01-04)

- Update `github-linker-core` to [1.3.0](https://github.com/stefanbuck/github-linker-core/blob/master/CHANGELOG.md#v130-2015-01-04)
  - Resolve `require()` in GitHub's Pull Request and Issues view.
  - Resolve `require()` in markdown files, if the [syntax highlighting](https://help.github.com/articles/github-flavored-markdown/#syntax-highlighting) is set to javascript.

## v3.2.0 (2014-11-04)

- Update `github-linker-core` to [1.2.0](https://github.com/stefanbuck/github-linker-core/blob/master/CHANGELOG.md#v120-2014-12-04)
  - Add jsx support [#6](https://github.com/stefanbuck/github-linker-core/issues/6)  ([Thanks @thejameskyle](https://github.com/thejameskyle))
  - Add options arg for the upcoming features [#7](https://github.com/stefanbuck/github-linker-core/issues/7)

## v3.1.1 (2014-10-30)

- Fix selectors to solve https://github.com/stefanbuck/github-linker/issues/20

## v3.1.0 (2014-10-22)

- Update `github-linker-core` to [1.1.0](https://github.com/stefanbuck/github-linker-core/blob/master/CHANGELOG.md#v110-2014-10-22)
    - Add links to `directories` and `bin` field [#2](https://github.com/stefanbuck/github-linker-core/issues/2)  ([Thanks @spacewander](https://github.com/spacewander))


## v3.0.0 (2014-09-25)

- Add [Composer](https://getcomposer.org) support (Thanks [@barryvdh](https://github.com/barryvdh))
- Add [Duo](http://duojs.org) support
- Move and refactor core into [github-linker-core](https://github.com/stefanbuck/github-linker-core)
- Move and refactor cache build into [github-linker-cache](https://github.com/stefanbuck/github-linker-cache)

## v2.1.0 (2014-07-30)

- Link `require()` statements in `.coffee` script files

## v2.0.0 (2014-06-16)
-
- Link `require()` statements with the related file or to their GitHub repository page


## v1.0.0 (2013-12-27)
- Link dependencies in a `package.json` or `bower.json` file to their GitHub repository page
