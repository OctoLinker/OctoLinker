# blob-reader

Turns GitHub's source code view into a unitary structure.

```js
[
  {
    path: 'https://github.com/octo-linker/chrome-extension/blob/c17911bf8f04146aaf3bbfe1cabaa317cbe2eb55/index.js',
    dirname: 'https://github.com/octo-linker/chrome-extension/blob/c17911bf8f04146aaf3bbfe1cabaa317cbe2eb5',
    filename: 'index.js',
    type: 'javascript',
    el: <div />
    lines: [
      {
        lineNumber: 2,
        value: 'import foo from "foo"',
      }
    ]
  }
]
```

## Example

```js
const reader = new BlobReader();
reader.read().forEach((blob) => {
  console.log(blob.path);
});

```

## Blob

### Filename

The last portion of a path.

### Dirname

The directory name of a path.

### Path

Fully-qualified url for this blob.

### Type

Detected language type for this blob. Can be undefined if the `type` was not found in the [lookup package](https://github.com/octo-linker/chrome-extension/tree/dev/packages/helper-file-type).

### El

Root element for this blob.

### Line Objects

Line objects are consist of the following fields:

- `value`: Line content
- `lineNumber`: Source code line number
- `addition`: True if the line was added or edited
- `deletion`: True if the line was deleted
