import regex from './regex';

export { default as go } from './go.js';

const captureQuotedWord = regex`
  ['"]              # beginning quote
  (?<$1>[^'"\s]+)   # capture the word inside the quotes
  ['"]              # end quote
`;

const captureSpacedQuotedWord = regex`
  ['"]              # beginning quote
  (?<$1>[^'"]+)     # capture the word inside the quotes
  ['"]              # end quote
`;

const captureJsQuotedWord = regex`
  ['"\`]            # beginning quote
  (?<$1>[^'"\`\s]+) # capture the word inside the quotes
  ['"\`]            # end quote
`;

const diffSigns = regex`
  ^[ \t]*[+-]?
`;

const importMembers = regex`[\r\n\s\w{},*\$]*`;
const from = regex`\s from \s`;

export const NODEJS_RELATIVE_PATH = regex`
  __dirname
  \s* \+ \s*
  ${captureJsQuotedWord}
`;

export const NODEJS_RELATIVE_PATH_JOIN = regex`
  path\.join \s*
  \( \s*
  __dirname \s*
  , \s*
  ${captureJsQuotedWord}
`;

export const REQUIRE = regex`
  ( require(\.resolve)? | proxyquire | import )
  \s* ( \s | \( ) \s*
  ${captureJsQuotedWord}
`;

export const REQUIRE_RELATIVE = regex`
  ( require_relative )
  \s* ( \s | \( ) \s*
  ${captureJsQuotedWord}
`;

export const IMPORT = regex`
  import \s ${importMembers}
  ${from}?
  ${captureQuotedWord}
`;

export const EXPORT = regex`
  export \s ${importMembers}
  ${from}
  ${captureQuotedWord}
`;

export const GEM = regex`
  gem \s ${captureQuotedWord}
`;

export const HOMEBREW = regex`
  (depends_on|conflicts_with)
  ( \s cask: | \s formula: )?
  \s
  ${captureQuotedWord}
`;

export const TYPESCRIPT_REFERENCE = regex`
  \/{3} \s?
  <reference \s path=${captureQuotedWord}
`;

export const DOCKER_FROM = regex`
  FROM \s+ (?<$1>[^\n]*)
`;

export const DOCKER_ENTRYPOINT = regex`
  ENTRYPOINT \s \[${captureQuotedWord}\]
`;

export const VIM_PLUGIN = regex`
  ${diffSigns}
  (
    (
      (Neo)?
      Bundle
      (Lazy|Fetch)?
    )
    |
    Plug(in)?
  ) \s
  ${captureQuotedWord}
`;

export const RUST_CRATE = regex`
  ${diffSigns}
  (extern \s crate | use)
  \s
  (?<$1>[^:;\s]+)
`;

export const PHP = regex`
  ${diffSigns}
  use
  \s
  (?!function\s)
  (?<$1>[^;\s]+)
`;

export const PHP_FUNC = regex`
  ${diffSigns}
  use
  \sfunction\s
  (?<$1>[^;\s]+)
`;

export const PYTHON_IMPORT = regex`
  ${diffSigns}
  (import|from)
  \s
  (?<$1>[^\s]*)
  (\s import \s (?<$2>[^\s,]*))?
`;

export const REQUIREMENTS_TXT = regex`
  ${diffSigns}
  (?<$1>[\w-]+) # the package name
  (
    \s*
    [=~!><] # the beginning of a version specifier: https://www.python.org/dev/peps/pep-0440/#version-specifiers
    .*
  )? # the version is optional
  $
`;

export const HASKELL_IMPORT = regex`
  ${diffSigns}
  (import\s+(qualified\s)?)
  (?<$1> [A-Z][\w.]+)
`;

export const CSS_IMPORT = regex`
  ${diffSigns}
  @import
  \s
  ((url|URL)\()?
  ['"]                # beginning quote
  (?<$1>
    (?!https?:\/\/)   # exclude urls
    [^'")]+           # capture the word inside the quotes
  )
  ['"]                # end quote
`;

export const CSS_URL = regex`
  ${diffSigns}
  .*
  (url|URL)\(
    ['"]?               # begin optional quote
    (?<$1>
      (?!https?:\/\/)   # exclude urls
      [^'")]+           # capture the word inside the quotes
    )
    ['"]?               # end optional quote
  \)
`;

export const LESS_IMPORT = regex`
  ${diffSigns}
  @import
  \s
  ( \([a-z, ]+\) \s+ )? # http://lesscss.org/features/#import-options
  ((url|URL)\()?
  ${captureQuotedWord}
`;

export const HTML_IMPORT = regex`
  ${diffSigns}
  <link
  \s
  rel="import"
  \s
  href=${captureQuotedWord}>
`;

export const HTML_SCRIPT_IMPORT = regex`
  <script
  [^>]*
  \s
  src=${captureQuotedWord}
  [^>]*
  \s*>
`;

export const NET_PACKAGE = regex`
  <\s*
  package
  \s*
  id=${captureQuotedWord}
  .*/>
`;

export const GITHUB_ACTIONS = regex`
  uses:\s*
  ['"]?               # begin optional quote
  (?<$1>[^@'"\s]+)    # repo with optional file path
  (
    @
    (?<$2>[^'"\s]+)   # hash/tag
  )?                  # the version is optional
  ['"]?               # end optional quote
`;

export const JAVA_IMPORT = regex`
  ${diffSigns}
  import
  \s
  (?<$1>
    (
      javax?
      |
      org\.springframework
      |
      io\.spring
      |
      sparklr\.common
      |
      org\.hamcrest
      |
      com\.fasterxml
      |
      org\.junit
      |
      org\.mockito
      |
      org\.apache
      |
      lombok
      |
      org\.atteo
      |
      org\.objectweb
      |
      org\.hamcrest
      |
      ch\.qos\.logback
      |
      yapion
      |
      org\.slf4j
    )
    ((\.[a-zA-Z0-9_]+)+[a-zA-Z0-9_])*
  )
`;

export const NET_PROJ_PACKAGE = regex`
  <(DotNetCliTool|Framework|Package)?Reference
  \s+
  .*
  (Include|Update)=${captureQuotedWord}
  .*/?>
`;

export const NET_PROJ_SDK = regex`
  <Project
  \s+
  .*
  Sdk=${captureQuotedWord}
  .*>
`;

export const NET_PROJ_FILE_REFERENCE = regex`
  <(Compile|Content|EmbeddedResource|None|ProjectReference)
  \s+
  .*
  (Include|Update)=${captureSpacedQuotedWord}
  .*/?>
`;

export const PAKET_DEPENDENCIES_NUGET = regex`
  (clitool|nuget)
  \s
  (?<$1>[^\s#]+)
`;

export const PAKET_DEPENDENCIES_GITHUB = regex`
  github
  \s
  (?<$1>[^ :]+)     # repo
  (
    :
    (?<$2>[\w-]+)   # hash/tag
  )?
  (
    \s
    (?<$3>[^\n]*)   # file path
  )?
`;

export const PAKET_REFERENCES = regex`
  ${diffSigns}
  (?![Ff]ile:)
  (?<$1>[^# \n]+)
`;

export const R_LIBRARY = regex`
  (library|require|requireNamespace|loadNamespace)\(
    ['"]? # optional open quote
    (?<$1>[\w\.]+) # package name
    ['"]? # optional close quote
    (.+)? # other optional function arguments
  \)
`;

export const R_NAMESPACE = regex`
(?<$1>[\w\.]+) # package name
:{2,3} # namespace operator
`;
