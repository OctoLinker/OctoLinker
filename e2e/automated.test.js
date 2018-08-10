const fixtures = require('./fixtures.json'); // eslint-disable-line import/no-unresolved
const diffFixtures = require('./diff-fixtures.json'); // eslint-disable-line import/no-unresolved

async function executeTest(url, targetUrl, selector) {
  await page.goto(url);

  await page.waitForSelector(selector);

  await Promise.all([
    page.waitForNavigation(),
    // page.click(selector), for some reason page.click is not working
    page.$eval(selector, el => el.click()),
  ]);

  await expect(page.url()).toEqual(expect.stringMatching(targetUrl));
}

describe('End to End tests', () => {
  describe('single blob', () => {
    fixtures.forEach(({ url, content, lineNumber, targetUrl }) => {
      it(`resolves ${content} to ${targetUrl}`, async () => {
        await executeTest(url, targetUrl, `#LC${lineNumber} .octolinker-link`);
      });
    });
  });

  describe('diff view', () => {
    diffFixtures.forEach(({ url, targetUrl }) => {
      it(
        `resolves ${url} to ${targetUrl}`,
        async () => {
          await executeTest(
            url,
            targetUrl,
            '.selected-line.blob-code .octolinker-link',
          );
        },
        10000,
      );
    });
  });
});
