import BowerManifest from './plugins/bower-manifest.js';
import Composer from './plugins/composer-manifest.js';
import CSS from './plugins/css.js';
import Docker from './plugins/docker.js';
import DotNetCore from './plugins/dot-net-core.js';
import DotNet from './plugins/dot-net.js';
import Rubygems from './plugins/gemfile-manifest.js';
import Go from './plugins/go.js';
import Haskell from './plugins/haskell.js';
import Homebrew from './plugins/homebrew-manifest.js';
import HTML from './plugins/html.js';
import Java from './plugins/java.js';
import JavaScript from './plugins/javascript.js';
import Less from './plugins/less.js';
import NodejsRelativePath from './plugins/nodejs-relative-path.js';
import NpmManifest from './plugins/npm-manifest.js';
import Python from './plugins/python.js';
import RequirementsTxt from './plugins/requirements-txt.js';
import Ruby from './plugins/ruby.js';
import Rust from './plugins/rust.js';
import Sass from './plugins/sass.js';
import TypeScript from './plugins/typescript.js';
import Vim from './plugins/vim.js';

export default function loadPlugins() {
  return [
    BowerManifest,
    Composer,
    CSS,
    Docker,
    DotNetCore,
    DotNet,
    Rubygems,
    Go,
    Haskell,
    Homebrew,
    HTML,
    Java,
    JavaScript,
    Less,
    NodejsRelativePath,
    NpmManifest,
    Python,
    RequirementsTxt,
    Ruby,
    Rust,
    Sass,
    TypeScript,
    Vim,
  ];
}
