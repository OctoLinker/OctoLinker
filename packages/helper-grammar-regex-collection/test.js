/* eslint import/namespace: [2, { allowComputed: true }] */

import assert from 'assert';
import * as REGEX from './index.js';

const fixtures = {
  NODEJS_RELATIVE_PATH_JOIN: {
    valid: [['app.set("views", path.join(__dirname, "/views");', ['/views']]],
    invalid: ['app.set("views", pathDjoin(__dirname, "/views");'],
  },
  NODEJS_RELATIVE_PATH: {
    valid: [['app.set("views", __dirname + "/views");', ['/views']]],
    invalid: ['app.set("views", path.join(__dirname, "/views");'],
  },
  IMPORT: {
    valid: [
      // See https://github.com/OctoLinker/browser-extension/issues/338#issuecomment-306065970
      [
        "* import {Component, NgZone} from '\\@angular/core';",
        ['\\@angular/core'],
      ],
      ["* import {NgIf} from '\\@angular/common';", ['\\@angular/common']],

      ['import foo from "foo"', ['foo']],
      ['import _ from "foo"', ['foo']],
      ['import $ from "foo"', ['foo']],
      ['import * as bar from "foo"', ['foo']],
      ['import { bar } from "foo"', ['foo']],
      ['import { foo as bar } from "foo"', ['foo']],
      ['import { foo, bar } from "foo"', ['foo']],
      ['import { foo, bar as baz } from "foo"', ['foo']],
      ['import foo, {bar} from "foo"', ['foo']],
      ['import foo, * as bar from "foo"', ['foo']],
      ['import "foo"', ['foo']],
      ['import \nfoo \nfrom \n"foo"', ['foo']],
      ['import {\nbar } from "foo"', ['foo']],
      ['import { bar\n } from "foo"', ['foo']],
      ['import { \nbar\n } from "foo"', ['foo']],
      ['import foo\n, {bar} from "foo"', ['foo']],
      ['import foo, {bar} \nfrom "foo"', ['foo']],
      ['import foo, {\nbar} from "foo"', ['foo']],
      ['import foo, {bar\n} from "foo"', ['foo']],
    ],
    invalid: [
      'import "fo o"',
      'import foo from `foo`',
      // TODO tweak IMPORT regexp so that invalid statements are not matched
      // 'import foo "foo"',
      // 'import from "foo"',
    ],
  },
  EXPORT: {
    valid: [
      ['export * from "foo"', ['foo']],
      ['export { foo, bar } from "foo"', ['foo']],
      ['export { foo as bar} from "foo"', ['foo']],
      ['export { foo, bar as baz } from "foo"', ['foo']],
      ['export {\nbar } from "foo"', ['foo']],
      ['export { bar\n } from "foo"', ['foo']],
      ['export { \nbar\n } from "foo"', ['foo']],
    ],
    invalid: ['export * from "fo o"', 'export * from `foo`'],
  },
  REQUIRE: {
    valid: [
      ['require("foo")', ['foo']],
      ['require( "foo" )', ['foo']],
      ['require(  "foo"  )', ['foo']],
      ['require(\t"foo"\t)', ['foo']],
      ['require ("foo")', ['foo']],
      ['var foo = require("foo")', ['foo']],
      ['var $ = require("foo")', ['foo']],
      ['var _ = require("foo")', ['foo']],
      ['var foo = require("foo")var bar = require("bar")', ['foo', 'bar']],
      ['require("foo")require("bar");', ['foo', 'bar']],
      ['require("foo")require("bar");', ['foo', 'bar']],
      ['var foo = require("foo")require("bar");', ['foo', 'bar']],
      ['var foo = require("foo")require("bar")', ['foo', 'bar']],
      ['foo = require("foo")require("bar")', ['foo', 'bar']],
      ['foo = require("foo")bar = require("bar")', ['foo', 'bar']],
      ['foo = require("a-b")bar = require("c-d-e")', ['a-b', 'c-d-e']],
      ['foo = require("./foo")bar = require("./bar")', ['./foo', './bar']],
      ['foo = require(`./foo`)bar = require(`./bar`)', ['./foo', './bar']],
      [
        'const foo = require("./foo")bar = require("./bar")',
        ['./foo', './bar'],
      ],
      ['require "foo"', ['foo']],
      // require.resolve
      ['require.resolve "foo"', ['foo']],
      ['require.resolve("foo")', ['foo']],
      ['require.resolve( "foo" )', ['foo']],
      ['require.resolve(  "foo"  )', ['foo']],
      ['require.resolve(\t"foo"\t)', ['foo']],
      ['require.resolve ("foo")', ['foo']],
      ['var foo = require.resolve("foo")', ['foo']],
      ['var foo = require.resolve(`foo`)', ['foo']],
      [
        'var foo = require.resolve("foo")var bar = require.resolve("bar")',
        ['foo', 'bar'],
      ],
      // proxyquire
      ['proxyquire "foo"', ['foo']],
      ['proxyquire("foo")', ['foo']],
      ['proxyquire( "foo" )', ['foo']],
      ['proxyquire(  "foo"  )', ['foo']],
      ['proxyquire(\t"foo"\t)', ['foo']],
      ['proxyquire ("foo")', ['foo']],
      ['var foo = proxyquire("foo")', ['foo']],
      [
        'var foo = proxyquire("foo")var bar = proxyquire("bar")',
        ['foo', 'bar'],
      ],
      // JavaScript Dynamic Imports import("./module")
      ['import("foo")', ['foo']],
      ['import( "foo" )', ['foo']],
      ['import(  "foo"  )', ['foo']],
      ['import(\t"foo"\t)', ['foo']],
      ['import ("foo")', ['foo']],
      ['var foo = import("foo")', ['foo']],
      ['var $ = import("foo")', ['foo']],
      ['var _ = import("foo")', ['foo']],
      ['var foo = import("foo")var bar = import("bar")', ['foo', 'bar']],
      ['import("foo")import("bar");', ['foo', 'bar']],
      ['import("foo")import("bar")', ['foo', 'bar']],
      ['import(`foo`)import(`bar`)', ['foo', 'bar']],
      ['var foo = import("foo")import("bar");', ['foo', 'bar']],
      ['var foo = import("foo")import("bar")', ['foo', 'bar']],
      ['foo = import("foo")import("bar")', ['foo', 'bar']],
      ['foo = import("foo")bar = import("bar")', ['foo', 'bar']],
      ['foo = import("a-b")bar = import("c-d-e")', ['a-b', 'c-d-e']],
      ['foo = import("./foo")bar = import("./bar")', ['./foo', './bar']],
      ['const foo = import("./foo")bar = import("./bar")', ['./foo', './bar']],
      ['import "foo"', ['foo']],
    ],
    invalid: [
      'require(foo)',
      'require"foo"',
      'require (foo)',
      'require("fo o")',
      'require_relative(foo)',
      'require_relative"foo"',
      'require_relative (foo)',
      'require_relative("fo o")',
      // require.resolve
      'require.resolve(foo)',
      'require.resolve"foo"',
      'require.resolve (foo)',
      'require.resolve("fo o")',
      'requireDresolve("foo")',
      // proxyquire
      'proxyquire(foo)',
      'proxyquire"foo"',
      'proxyquire (foo)',
      'proxyquire("fo o")',
      // JavaScript Dynamic Imports import("./module")
      'import(foo)',
      'import"foo"',
      'import (foo)',
      'import("fo o")',
      // import.resolve
      'import.resolve(foo)',
      'import.resolve"foo"',
      'import.resolve ("foo")',
      'import.resolve (foo)',
      'import.resolve("fo o")',
      'import.resolve "foo"',
      'import.resolve("foo")',
      'import.resolve( "foo" )',
      'import.resolve(  "foo"  )',
      'import.resolve(\t"foo"\t)',
      'var foo = import.resolve("foo")',
      'var foo = import.resolve("foo")var bar = import.resolve("bar")',
    ],
  },
  REQUIRE_RELATIVE: {
    valid: [
      ['require_relative "foo"', ['foo']],
      ['require_relative "channel_prefix"', ['channel_prefix']],
    ],
    invalid: [
      'require_relative(foo)',
      'require_relative"foo"',
      'require_relative (foo)',
      'require_relative("fo o")',
    ],
  },
  GEM: {
    valid: [
      ['gem "foo"', ['foo']],
      ["gem 'foo'", ['foo']],
    ],
    invalid: ['gem     "foo"'],
  },
  HASKELL_IMPORT: {
    valid: [
      ['import Foo', ['Foo']],
      ['import Foo.Bar', ['Foo.Bar']],
      ['import qualified Foo', ['Foo']],
      ['import qualified Foo.Bar', ['Foo.Bar']],
      ['import Foo.Bar.Baz', ['Foo.Bar.Baz']],
      ['import Foo Bar', ['Foo']],
      ['import Foo', ['Foo']],
      ['import Foo as Bar', ['Foo']],
      ['import Foo ()', ['Foo']],
      ['import Foo', ['Foo']],
    ],
    invalid: [
      ['limport Foo'],
      ['imports Foo'],
      ['import "Foo"'],
      ['import /Foo'],
      ['import .foo'],
      ['import foo'],
    ],
  },
  HOMEBREW: {
    valid: [
      ['depends_on "foo"', ['foo']],
      ["depends_on 'foo'", ['foo']],
      ['conflicts_with "foo"', ['foo']],
      ["conflicts_with 'foo'", ['foo']],
      ['depends_on cask: "foo"', ['foo']],
      ["depends_on cask: 'foo'", ['foo']],
      ['conflicts_with cask: "foo"', ['foo']],
      ["conflicts_with cask: 'foo'", ['foo']],
      ['depends_on formula: "foo"', ['foo']],
      ["depends_on formula: 'foo'", ['foo']],
      ['conflicts_with formula: "foo"', ['foo']],
      ["conflicts_with formula: 'foo'", ['foo']],
    ],
    // These probably aren't actually invalid, but
    // https://github.com/Homebrew/homebrew-core/ has no occurences of multiple
    // spaces after depends_on/conflicts_with, and I'm guessing their lint
    // prohibits them anyway.
    invalid: ['depends_on     "foo"', 'conflicts_with     "foo"'],
  },
  TYPESCRIPT_REFERENCE: {
    valid: [
      ['/// <reference path="foo" />', ['foo']],
      ['///<reference path="foo" />', ['foo']],
    ],
    invalid: ['// <reference path="foo" />'],
  },
  DOCKER_FROM: {
    valid: [
      ['FROM foo', ['foo']],
      ['FROM foo:1.2.3', ['foo:1.2.3']],
      ['FROM foo:1.2.3-alpha', ['foo:1.2.3-alpha']],
      ['FROM         foo:1.2.3-alpha', ['foo:1.2.3-alpha']],
      ['FROM foo/bar', ['foo/bar']],
    ],
    invalid: [
      'FROMfoo',
      // 'FROM\nfoo',
    ],
  },
  DOCKER_ENTRYPOINT: {
    valid: [['ENTRYPOINT ["foo-bar.sh"]', ['foo-bar.sh']]],
    invalid: ['ENTRYPOINTfoobar'],
  },
  VIM_PLUGIN: {
    valid: [
      ["Plugin 'VundleVim/Vundle.vim'", ['VundleVim/Vundle.vim']],
      ['Plugin "VundleVim/Vundle.vim"', ['VundleVim/Vundle.vim']],
      ["Plugin 'ctrlp.vim'", ['ctrlp.vim']],
      ['Plugin "ctrlp.vim"', ['ctrlp.vim']],
    ],
    invalid: ["Plugin'ctrlp.vim'"],
  },
  RUST_CRATE: {
    valid: [
      ['extern crate pcre;', ['pcre']],
      ['extern crate std as ruststd;', ['std']],
      ['use std::option::Option::{Some, None};', ['std']],
    ],
    invalid: [
      "extern create 'pcre'",
      'because it',
      'everything is currently by shared reference, the easiest thing is to use a `RefCell`',
    ],
  },
  PYTHON_IMPORT: {
    valid: [
      ['import foo', ['foo']],
      ['\nimport foo', ['foo']],
      ['import fo_o', ['fo_o']],
      ['import .foo', ['.foo']],
      ['import foo as bar', ['foo']],
      ['from .foo import bar', ['.foo', 'bar']],
      ['from foo import bar', ['foo', 'bar']],
      ['from foo import bar, baz', ['foo', 'bar']],
      ['from foo.bar import baz', ['foo.bar', 'baz']],
    ],
    invalid: ['simport foo', 'simport\nfoo', '# from the'],
  },
  REQUIREMENTS_TXT: {
    valid: [
      ['wheel==0.23.0', ['wheel']],
      ['Yarg==0.1.9', ['Yarg']],
      ['docopt==0.6.2', ['docopt']],
      ['Flask-Cache==0.13.1', ['Flask-Cache']],
      ['flake8', ['flake8']],
    ],
    invalid: ['-r requirements.txt'],
  },
  CSS_IMPORT: {
    valid: [
      ["@import 'foo'", ['foo']],
      ['@import "foo"', ['foo']],
      ['@import "foo" bar', ['foo']],
      ['@import URL("foo")', ['foo']],
      ['@import url("foo")', ['foo']],
      ['@import url("foo") bar', ['foo']],
    ],
    invalid: [
      '@import foo',
      '@import url(foo)',
      '@import url("http://octolinker.now.sh/")',
      '@import url("https://octolinker.now.sh/")',
    ],
  },
  CSS_URL: {
    valid: [
      ['background: url(foo);', ['foo']],
      ['background: URL(foo);', ['foo']],
      ['background-image:\nurl(foo)\n;', ['foo']],
    ],
    invalid: [
      'background: url(http://foo);',
      'background: url(https://foo);',
      'background-image:\nurl(https://foo)\n;',
    ],
  },
  LESS_IMPORT: {
    valid: [
      ['@import (less) "foo";', ['foo']],
      ['@import (optional, reference) "foo";', ['foo']],
      // below copied from CSS_IMPORT
      ["@import 'foo'", ['foo']],
      ['@import "foo"', ['foo']],
      ['@import "foo" bar', ['foo']],
      ['@import URL("foo")', ['foo']],
      ['@import url("foo")', ['foo']],
      ['@import url("foo") bar', ['foo']],
      // above copied from CSS_IMPORT
    ],
    invalid: [
      // below copied from CSS_IMPORT
      '@import foo',
      '@import url(foo)',
      // above copied from CSS_IMPORT
    ],
  },
  HTML_IMPORT: {
    valid: [['<link rel="import" href="foo">', ['foo']]],
    invalid: ['<link href="foo">'],
  },
  HTML_SCRIPT_IMPORT: {
    valid: [
      ['<script src="foo"></script>', ['foo']],
      [
        `<script src="foo">
        function bar() {}
      </script>`,
        ['foo'],
      ],
      ['<script type="application/javascript" src="foo"></script>', ['foo']],
      ['<script src="foo" type="application/javascript"></script>', ['foo']],
    ],
    invalid: [
      '<script></script>',
      `<script>
        function bar() {}
      </script>`,
    ],
  },
  go: {
    valid: [
      ['import "foo"', ['foo']],
      ['import _ "foo"', ['foo']],
      ['import . "foo"', ['foo']],
      ['import bar "foo"', ['foo']],
      ['import "./foo"', ['./foo']],
      ['import "./foo/bar"', ['./foo/bar']],
      ['\nimport "foo"', ['foo']],
      ['import "fo_o"', ['fo_o']],
      ['import "github.com/foo/bar"', ['github.com/foo/bar']],
      ['import "bitbucket.org/foo/bar"', ['bitbucket.org/foo/bar']],
      ['import "launchpad.net/foo/bar"', ['launchpad.net/foo/bar']],
      ['import "hub.jazz.net/foo/bar"', ['hub.jazz.net/foo/bar']],
      ['import "gopkg.in/foo/bar"', ['gopkg.in/foo/bar']],
      ['import "k8s.io/foo/bar"', ['k8s.io/foo/bar']],
      ['import (\n"foo"\n)', ['foo']],
      ['import (\n_ "foo"\n)', ['foo']],
      ['import (\n. "foo"\n)', ['foo']],
      ['import (\nbar "foo"\n)', ['foo']],
      ['import (\n    "foo"\n)', ['foo']],
      ['import (\n"./foo"\n"./bar"\n)', ['./foo', './bar']],
      ['import (\n"github.com/foo/bar"\n)', ['github.com/foo/bar']],
      ['import (\n"bitbucket.org/foo/bar"\n)', ['bitbucket.org/foo/bar']],
      ['import (\n"launchpad.net/foo/bar"\n)', ['launchpad.net/foo/bar']],
      ['import (\n"hub.jazz.net/foo/bar"\n)', ['hub.jazz.net/foo/bar']],
      ['import (\n"gopkg.in/foo/bar"\n)', ['gopkg.in/foo/bar']],
      [
        'import (\n"github.com/foo"\n"github.com/bar"\n)',
        ['github.com/foo', 'github.com/bar'],
      ],
      [
        'import (\n"github.com/foo"\n\n"github.com/bar"\n)',
        ['github.com/foo', 'github.com/bar'],
      ],
      ['import (\nbar "github.com/foo/bar"\n)', ['github.com/foo/bar']],
      [
        'import (\n"golang.org/x/net/context"\n"golang.org/pkg/net"\n)',
        ['golang.org/x/net/context', 'golang.org/pkg/net'],
      ],

      // go.mod
      ['require github.com/foo v1.1.0', ['github.com/foo']],
      ['require bitbucket.org/foo v1.1.0', ['bitbucket.org/foo']],
      ['require launchpad.net/foo v1.1.0', ['launchpad.net/foo']],
      ['require    github.com/foo v1.1.0', ['github.com/foo']],
      ['require github.com/foo v1.1.0      ', ['github.com/foo']],
      ['require github.com/foo v1.1.0\n', ['github.com/foo']],

      ['require github.com/foo/v2', ['github.com/foo/v2']],

      ['require (\ngithub.com/foo v1.1.0\n)', ['github.com/foo']],
      [
        'require (\ngithub.com/foo v1.1.0\n\ngithub.com/bar v1.1.0\n)',
        ['github.com/foo', 'github.com/bar'],
      ],
    ],
    invalid: [
      'simport foo',
      'simport\nfoo',
      'import "octo.com/foo/bar"',
      'import (\n"octo.com/foo/bar"\n)',

      'require (github.com/foo v1.1.0)',
      'require \n"foo" v1.1.0',
      'srequire "foo" v1.1.0',
      'require "foo" v1.1.0',
    ],
  },
  NET_PACKAGE: {
    valid: [
      [
        '<package id="foo" version="2.7.7.02" targetFramework="net45" />',
        ['foo'],
      ],
      [
        '< package id="foo" version="2.7.7.02" targetFramework="net45" />',
        ['foo'],
      ],
    ],
    invalid: [
      '<packages id="Antlr2.Runtime" version="2.7.7.02" targetFramework="net45" />',
      '<package version="2.7.7.02" targetFramework="net45" />',
    ],
  },
  JAVA_IMPORT: {
    valid: [
      ['import java.util.Foo', ['java.util.Foo']],
      ['import javax.util.Foo', ['javax.util.Foo']],
      ['import org.springframework.Foo', ['org.springframework.Foo']],
      ['import io.spring.Foo', ['io.spring.Foo']],
      ['import sparklr.common.Foo', ['sparklr.common.Foo']],
      ['import org.hamcrest.Foo', ['org.hamcrest.Foo']],
      ['import com.fasterxml.Foo', ['com.fasterxml.Foo']],
      ['import org.junit.Foo', ['org.junit.Foo']],
      ['import lombok.Foo', ['lombok.Foo']],
      ['import org.atteo.Foo', ['org.atteo.Foo']],
      ['import org.objectweb.Foo', ['org.objectweb.Foo']],
      ['import org.hamcrest.Foo', ['org.hamcrest.Foo']],
      ['import ch.qos.logback.Foo', ['ch.qos.logback.Foo']],
      ['import yapion.Foo', ['yapion.Foo']],
      ['import org.mockito.Foo', ['org.mockito.Foo']],
      ['import org.apache.Foo', ['org.apache.Foo']],
      ['import org.slf4j.Foo', ['org.slf4j.Foo']],
    ],
    invalid: [
      'import com.company.app', // For now, we support java core packages only
      'import 1com.company.myapp',
      'import m.company.region.myapp',
      'import c0m.company.region.myapp',
      'import com.-company.myapp',
      'import com.company.1',
      'import com.company..myapp',
    ],
  },
  NET_PROJ_PACKAGE: {
    valid: [
      ['<PackageReference Include="foo" Version="6.2.0" />', ['foo']],
      [
        '<PackageReference Include="foo" Version="$(MicrosoftExtensionsCachingMemoryPackageVersion)" />',
        ['foo'],
      ],
      ['<PackageReference Version="6.2.0" Include="foo" />', ['foo']],
      [
        '<PackageReference Include="foo">\n<Version>2.0.0</Version>\n</PackageReference>',
        ['foo'],
      ],
      ['<DotNetCliToolReference Include="foo" Version="6.2.0" />', ['foo']],
      [
        '<DotNetCliToolReference Include="foo" Version="$(MicrosoftExtensionsCachingMemoryPackageVersion)" />',
        ['foo'],
      ],
      ['<DotNetCliToolReference Version="6.2.0" Include="foo" />', ['foo']],
      [
        '<DotNetCliToolReference Include="foo">\n<Version>2.0.0</Version>\n</DotNetCliToolReference>',
        ['foo'],
      ],
      ['<PackageReference Update="foo" Version="6.2.0" />', ['foo']],
      ['<FrameworkReference Include="foo" />', ['foo']],
      ['<FrameworkReference Update="foo" />', ['foo']],
    ],
    invalid: [
      '<PackageReferences Include="EntityFramework" Version="6.2.0" />',
      '<PackageReference Includes="EntityFramework" Version="6.2.0" />',
      '< PackageReference Include="EntityFramework" Version="6.2.0" />',
      '<DotNetCliToolReferences Include="Microsoft.DotNet.Xdt.Tools" Version="2.0.0" />',
      '<DotNetCliToolReference Includes="Microsoft.DotNet.Xdt.Tools" Version="2.0.0" />',
      '< DotNetCliToolReference  Include="Microsoft.DotNet.Xdt.Tools" Version="2.0.0" />',
    ],
  },
  GITHUB_ACTIONS: {
    valid: [
      ['uses: foo/bar', ['foo/bar']],
      ['uses: foo/bar@v1', ['foo/bar', 'v1']],
      ['uses: foo/bar@master', ['foo/bar', 'master']],
      ['uses: "foo/bar"', ['foo/bar']],
      ['uses: "foo/bar@v1"', ['foo/bar', 'v1']],
      ["uses: 'foo/bar'", ['foo/bar']],
      ["uses: 'foo/bar@v1'", ['foo/bar', 'v1']],
    ],
    invalid: [],
  },
  PHP: {
    valid: [
      ['use Closure', ['Closure']],
      ['use ArrayAccess', ['ArrayAccess']],
      [
        'use Illuminate\\Contracts\\Container\\BindingResolutionException',
        ['Illuminate\\Contracts\\Container\\BindingResolutionException'],
      ],
    ],
    invalid: ['use function is_array'],
  },
  PHP_FUNC: {
    valid: [
      ['use function is_array', ['is_array']],
      ['use function preg_last_error', ['preg_last_error']],
    ],
    invalid: [
      'use Closure',
      'use Illuminate\\Contracts\\Container\\BindingResolutionException',
      ['Illuminate\\Contracts\\Container\\BindingResolutionException'],
    ],
  },
  NET_PROJ_SDK: {
    valid: [['<Project Sdk="foo">', ['foo']]],
    invalid: [
      '<Project DefaultTargets="Build" ToolsVersion="12.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">',
    ],
  },
  NET_PROJ_FILE_REFERENCE: {
    valid: [
      ['<Compile Include="foo">', ['foo']],
      ['<Compile Update="foo">', ['foo']],
      ['<Content Include="foo">', ['foo']],
      ['<Content Include="foo/bar foo">', ['foo/bar foo']],
      ['<Content Include="foo bar/bar">', ['foo bar/bar']],
      ['<Content Include="foo bar/bar foo">', ['foo bar/bar foo']],
      ['<Content Update="foo">', ['foo']],
      ['<EmbeddedResource Include="foo">', ['foo']],
      ['<EmbeddedResource Update="foo">', ['foo']],
      ['<None Include="foo">', ['foo']],
      ['<None Update="foo">', ['foo']],
      ['<ProjectReference Include="foo">', ['foo']],
    ],
    invalid: [],
  },
  PAKET_DEPENDENCIES_NUGET: {
    valid: [
      ['nuget foo', ['foo']],
      ['nuget foo = 1.0', ['foo']],
      ['nuget foo >= 5', ['foo']],
      ['    nuget foo', ['foo']],
      ['    nuget foo = 1.0', ['foo']],
      ['    nuget foo >= 5', ['foo']],
      ['nuget foo 1.2.3 -> source ./local_source', ['foo']],
      ['nuget foo.bar 1.2.3 -> source ./local_source', ['foo.bar']],
      ['clitool foo', ['foo']],
    ],
    invalid: [
      'foo',
      'nuget',
      '# nuget',
      'nuget # foo',
      'https://nuget.org',
      'source https://nuget.org/api/v2',
    ],
  },
  PAKET_DEPENDENCIES_GITHUB: {
    valid: [
      ['github foo', ['foo']],
      ['github foo/bar', ['foo/bar']],
      ['github foo/bar:abc123', ['foo/bar', 'abc123']],
      ['github foo/bar:abc123 bar/baz', ['foo/bar', 'abc123', 'bar/baz']],
      ['    github foo', ['foo']],
      ['    github foo/bar', ['foo/bar']],
      ['    github foo/bar:abc123', ['foo/bar', 'abc123']],
      ['    github foo/bar:abc123 bar/baz', ['foo/bar', 'abc123', 'bar/baz']],
    ],
    invalid: ['foo', 'github', '# github', 'https://github.com'],
  },
  PAKET_REFERENCES: {
    valid: [
      ['foo', ['foo']],
      ['foo # bar', ['foo']],
      ['foo.bar', ['foo.bar']],
    ],
    invalid: ['File:foo', 'file:foo'],
  },
  R_LIBRARY: {
    valid: [
      ['library(foo)', ['foo']],
      ['library("foo")', ['foo']],
      ['require(foo, quietly = TRUE)', ['foo']],
      ['require("foo", quietly = TRUE)', ['foo']],
      ['requireNamespace("foo", quietly = TRUE)', ['foo']],
      ['requireNamespace("foo")', ['foo']],
      ['loadNamespace("foo")', ['foo']],
    ],
    invalid: [],
  },
  R_NAMESPACE: {
    valid: [
      ['foo::bar()', ['foo']],
      ['foo:::bar()', ['foo']],
    ],
    invalid: [],
  },
};

function fixturesIterator(fixturesList, next) {
  fixturesList.forEach((statement) => {
    const text = Array.isArray(statement) ? statement[0] : statement;
    const expected = Array.isArray(statement) ? statement[1] : null;

    next(text, expected);
  });
}

function addModifiedLines(valid) {
  const [text, expected] = valid[0];
  const diffLines = [
    [` -${text}`, expected],
    [` +${text}`, expected],
  ];

  return [].concat([], diffLines, valid);
}

describe('helper-grammar-regex-collection', () => {
  Object.keys(fixtures).forEach((grammar) => {
    const spec = fixtures[grammar];

    const { invalid } = spec;
    const valid = addModifiedLines(spec.valid);

    let regexes = REGEX[grammar];

    // Help ensure that `regexes` is a function that returns an array of RegExp
    if (regexes instanceof RegExp) {
      regexes = [regexes];
    }
    if (Array.isArray(regexes)) {
      const oldRegexes = regexes;
      regexes = () => oldRegexes;
    }

    describe(grammar, () => {
      describe('valid', () => {
        fixturesIterator(valid, (text, expected) => {
          it(text, () => {
            let match;
            let result = [];

            regexes(text).forEach((regex) => {
              // eslint-disable-next-line
              while (match = regex.exec(text)) {
                result = result.concat(match.filter((item) => !!item).slice(1));
              }
            });

            assert.deepEqual(result, expected);
          });
        });
      });

      describe('invalid', () => {
        fixturesIterator(invalid, (text) => {
          it(text, () => {
            regexes(text).forEach((regex) => {
              assert.equal(regex.exec(text), null);
            });
          });
        });
      });
    });
  });
});
