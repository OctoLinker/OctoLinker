const baseUrl = 'https://github.com/OctoLinker/e2e';

async function goto(url) {
  await page.goto(url);
  await page.waitForSelector('.octolinker-link');

  // TODO Allow annotations beyond the first line
  const annotation = await page.$eval('#LC1', el => el.textContent);
  const targetPath = annotation
    .replace('// Should resolve to: ', '')
    .replace('<root>', '');

  await page.click('.octolinker-link');
  await page.waitForNavigation();

  await expect(page.url()).toEqual(expect.stringMatching(targetPath));
}

describe('End to End tests', () => {
  // TODO scrape https://github.com/OctoLinker/e2e/ for those urls
  [
    `${baseUrl}/blob/master/javascript/nodejs/index.js`,
    `${baseUrl}/blob/master/javascript/nodejs/gentle-resonance-3436.js`,
  ].forEach(url => {
    it(`resolves ${url}`, async () => {
      await goto(url);
    });
  });
});
