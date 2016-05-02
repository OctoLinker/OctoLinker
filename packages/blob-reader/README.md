# blob-reader

> Turns GitHubs page source into a unitary structure.

```js
[
  {
    path: 'https://github.com/octo-linker/chrome-extension/blob/c17911bf8f04146aaf3bbfe1cabaa317cbe2eb55/index.js',
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

## Usage

```js
const reader = new BlobReader();

reader.read().forEach((blob) => {
  console.log('Blob path', blob.path);
  console.log('Total lines', blob.lines.length);
});

```

## API

### BlobReader

### reader.hasBlobs()

Checks if the current page contains a blob. Returns `true` if there is at least one blob available, else `false`.

### reader.read()

Runs the blob reader to preprocess all available blobs on the current page.

### reader.forEach(iteratee)

Iterates over all blobs and invokes iteratee for each blob. The iteratee is invoked with three arguments: `Blob`, `index`, `collection`.

#### iteratee

*Required*

Type: `function`

The function invoked per iteration


### Blob

A blob is a single representation of a source code file on GitHub.com.

#### blob.path

Fully-qualified url for this blob.

For example https://github.com/octo-linker/chrome-extension/blob/c17911bf8f04146aaf3bbfe1cabaa317cbe2eb55/index.js


#### blob.el

Reference to the DOM node for this blob. Use this reference to make changes on the page.

#### blob.lines

An array of strings, where each string represents a line of the source code. Useful for code analysis.

For example: `[ { value: 'Line 1', lineNumber: 1 } ...]`

Line objects are consist of the following fields:

- `value`: Line content
- `lineNumber`: Source code line number
- `addition`: `true` if the line was added or edited
- `deletion`: `true` if the line was deleted


#### blob.getText()

Returns a raw representation of this blob.

#### blob.getJSON()

Returns a JSON object if blob is a valid JSON file, else `null`.
