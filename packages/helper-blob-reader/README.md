# helper-blob-reader

Turns GitHub's source code view into a unitary structure.

```js
[
  {
    path: 'https://github.com/octo-linker/chrome-extension/blob/c17911bf8f04146aaf3bbfe1cabaa317cbe2eb55/index.js',
    type: 'javascript',
    el: <div rel="the blob root element" />
    lines: [
      'import foo from "foo"',
      "",
      'foo.bar()'
    ]
  },
  ...
]
```

**Note:** The `type` property can be undefined if the `type` was not found in the [lookup package](https://github.com/octo-linker/chrome-extension/tree/dev/packages/helper-file-type).
