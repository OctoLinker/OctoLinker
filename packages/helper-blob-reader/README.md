# helper-blob-reader

Turns GitHub's source code view into a unitary structure.

```js
[
  {
    path: 'https://github.com/octo-linker/chrome-extension/blob/c17911bf8f04146aaf3bbfe1cabaa317cbe2eb55/index.js',
    type: 'javascript',
    lines: [
      {
        text: 'var foo = require("foo")',
        el: <div ... />
      },
      ...
    ]
  },
  ...
]
```

**Note:** The `type` property can be undefined if the `type` was not found in the [lookup package](https://github.com/octo-linker/chrome-extension/tree/dev/packages/helper-file-type).

## Supported sections

- [x] Blobs (Source code view)
- [x] Diffs (within a PR or specific commit)
- [ ] Code review comments (not supported, yet)
- [ ] Search (not supported, yet)
- [ ] Gist (not supported, yet)
