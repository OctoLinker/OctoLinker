const { writeFileSync } = require('fs');
const { join } = require('path');
const fetch = require('node-fetch');

const baseUrl = 'https://github.com/OctoLinker/e2e';

(async function() {
  const response = await fetch(
    'https://api.github.com/repos/octolinker/e2e/git/trees/master?recursive=1',
  );
  const json = await response.json();

  const content = json.tree
    .filter(({ type, path }) => type === 'blob' && path !== 'README.md')
    .map(({ path }) => `${baseUrl}/blob/master/${path}`);

  writeFileSync(
    join(__dirname, '/urls.json'),
    JSON.stringify(content, null, ' '),
  );
})();
