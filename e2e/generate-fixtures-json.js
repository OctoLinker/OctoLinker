const fs = require('fs');
const path = require('path');
const util = require('util');
const recursive = require('recursive-readdir');
const async = require('async');

// This will generate a json file which is consumed by automated.test.js in the following format.
// Checkout out https://github.com/OctoLinker/OctoLinker/blob/master/e2e/README.md for details.
//
// [
//    {
//     "url": "https://github.com/OctoLinker/OctoLinker/blob/master/e2e/fixtures/javascript/nodejs/gentle-resonance-3436.js",
//     "content": "require('./proud-tooth-7361');",
//     "targetUrl": "/javascript/nodejs/proud-tooth-7361.js",
//     "lineNumber": 2
//    },
//    ...
// ]

const repoSlug =
  process.env.TRAVIS_PULL_REQUEST_SLUG || 'OctoLinker/OctoLinker';
const branch = process.env.TRAVIS_PULL_REQUEST_BRANCH || 'master';
const fixturesRoot = `https://github.com/${repoSlug}/blob/${branch}/e2e`;

console.log('Fixtures root:', fixturesRoot); // eslint-disable-line no-console

async function readContent(files) {
  const readFile = util.promisify(fs.readFile);
  const mapLimit = util.promisify(async.mapLimit);

  return mapLimit(files, 10, async file => {
    const content = await readFile(file, 'utf8');

    return {
      file,
      content,
    };
  });
}

function findTests(contents) {
  return contents.reduce((memo, { file, content }) => {
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (line.includes('@OctoLinkerResolve')) {
        const lineNumber = index + 2;
        const targetUrl = line
          .match(/@OctoLinkerResolve\((.*?)\)/)[1]
          .replace('<root>', '');

        const filePath = file.replace(__dirname, '');

        memo.push({
          url: `${fixturesRoot}${filePath}`,
          content: lines[index + 1].trim(),
          targetUrl,
          lineNumber,
        });
      }
    });

    return memo;
  }, []);
}

(async function init() {
  const files = await recursive(path.join(__dirname, 'fixtures'));
  const contents = await readContent(files);
  const out = findTests(contents);

  fs.writeFileSync(
    path.join(__dirname, 'fixtures.json'),
    JSON.stringify(out, null, ' '),
  );
})();
